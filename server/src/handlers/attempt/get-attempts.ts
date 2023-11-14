// Local Imports
import {
  IS_NUMBER,
  sanitizeCursorLimit,
  sanitizeCursorOffset
} from '../../config';
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  Attempt,
  ClimbingRequest,
  ClimbingResponse,
  Dictionary,
  QueryConditions,
  Rating,
} from '../../types';

/**
 * Retrieves a set of attempts based on query parameters.
 */
export class GetAttemptsHandler extends Handler {
  /**
   * Executes the handler.
   *
   * @param {ClimbingRequest} req Request for handler.
   * @param {ClimbingResponse} res Response to request.
   */
  async execute(
    req: ClimbingRequest,
    res: ClimbingResponse,
  ): Promise<void> {
    try {
      // Verify current user session.
      const user = await validate(
        req,
        Handler.database,
      );

      // Retrieve parameters.
      const {
        user: username,
        date,
        route,
        status,
        offset = "0",
        limit = "50",
      } = req.query;

      // Ensure valididty of parameters.
      if (!username && !date && !route && !status) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('query', 'attempt'),
        });
        return;
      }

      // Prepare find query.
      const query = {} as QueryConditions;
      if (username) {
        query.user = `${username}`;
      }
      if (date && IS_NUMBER.test(`${date}`)) {
        query.date = parseInt(`${date}`, 10);
      }
      if (route) {
        query.route = `${route}`;
      }
      if (status) {
        query.status = `${status}`;
      }

      // Find all attempts.
      const attempts = await Handler.database.attempt.find(
        query,
        {},
        {
          date: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      // Prepare user table.
      const userAttempts = {} as Dictionary<Attempt[]>;

      // For every attempt, find the user.
      for (let i = 0; i < attempts.length; i += 1) {
        const attempt = attempts[i];
        const { user: attemptUser } = attempt;

        // Log attempt under user.
        if (!(attemptUser in userAttempts)) {
          userAttempts[attemptUser] = [attempt];
        } else {
          userAttempts[attemptUser].push(attempt);
        }
      }

      // Resolve all users.
      const users = await Handler.database.user.find({
        username: {
          $in: Object.keys(userAttempts),
        },
      });

      const approvedAttempts = [];
      const userReferenceTable = {};

      const routes = {} as Dictionary<boolean>;
      const ratings = {} as Dictionary<Dictionary<boolean>>;

      // Check if each attempt is allowed.
      for (let i = 0; i < users.length; i += 1) {
        const resolvedUser = users[i];

        if (!resolvedUser) {
          continue;
        }

        const { username } = resolvedUser;

        // If approved
        if ((user && user.admin)
          || resolvedUser.attemptPrivacy !== 'private'
          || (user && user.username === username)) {
          approvedAttempts.push(...userAttempts[username]);
          userReferenceTable[username] = convertUserToPublic(resolvedUser);
          ratings[username] = {};

          for (let j = 0; j < userAttempts[username].length; j += 1) {
            const { route } = userAttempts[username][j];

            routes[route] = true;
          }
        }
      }

      // Find all routes.
      const foundRoutes = Handler.database.route.find({
        _id: {
          $in: Object.keys(routes),
        },
      });

      // Find all ratings.
      const ratingUsers = Object.keys(ratings);
      const foundRatings = {} as Dictionary<Promise<Rating[]>>;
      for (let i = 0; i < ratingUsers.length; i += 1) {
        const ratingUser = ratingUsers[i];

        foundRatings[ratingUser] = Handler.database.rating.find({
          user: ratingUser,
          route: {
            $in: Object.keys(ratings[ratingUser]),
          },
        });
      }

      // Wait for all routes and ratings.
      await Promise.all([
        foundRoutes,
        ...Object.values(foundRatings),
      ]);

      // Reduce all linking tables.
      res.status(200).send({
        attempts: approvedAttempts,
        routes: (await foundRoutes).reduce((acc, route) => ({
          ...acc,
          [route._id]: route,
        }), {}),
        ratings: await Object.entries(foundRatings).reduce(async (acc, [foundRatingsUser, foundRatings]) => ({
          ...acc,
          [foundRatingsUser]: (await foundRatings).reduce((acc, rating) => ({
            ...acc,
            [rating.route]: rating,
          }), {}),
        }), {}),
        users: userReferenceTable,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
