// Local Imports
import {
  IS_NUMBER,
  sanitizeCursorLimit,
  sanitizeCursorOffset,
  sanitizeDate,
} from '../../config';
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Dictionary,
  Interest,
  QueryConditions,
} from '../../types';

/**
 * Retrieves a set of interest based on query parameters.
 */
export class GetInterestsHandler extends Handler {
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
        user: username = user.username,
        date = 0,
        route = '',
        status = 'interested',
        offset = '0',
        limit = '50',
      } = req.query;

      // Ensure valididty of parameters.
      if (!username && !date && !route && !status) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('query', 'interest'),
        });
        return;
      }

      // Prepare find query.
      const query = {} as QueryConditions;
      if ('user' in req.query) {
        query.user = `${username}`;
      }
      if ('date' in req.query) {
        query.date = sanitizeDate(date);
      }
      if ('route' in req.query) {
        query.route = `${route}`;
      }
      if ('status' in req.query) {
        query.status = `${status}`;
      }

      // Find all interests.
      const interests = await Handler.database.interest.find(
        query,
        {},
        {
          date: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      // Prepare user table.
      const userInterests = {} as Dictionary<Interest[]>;

      // For every interest, find the user.
      for (let i = 0; i < interests.length; i += 1) {
        const interest = interests[i];
        const { user: interestUser } = interest;

        // Log interest under user.
        if (!(interestUser in userInterests)) {
          userInterests[interestUser] = [interest];
        } else {
          userInterests[interestUser].push(interest);
        }
      }

      // Resolve all users.
      const users = await Handler.database.user.find({
        username: {
          $in: Object.keys(userInterests),
        },
      });

      const approvedInterests = [];
      const userReferenceTable = {};

      const routes = {} as Dictionary<boolean>;

      // Check if each interest is allowed.
      for (let i = 0; i < users.length; i += 1) {
        const resolvedUser = users[i];

        if (!resolvedUser) {
          continue;
        }

        const { username } = resolvedUser;

        // If approved
        if ((user && user.admin)
          || resolvedUser.interestPrivacy !== 'private'
          || (user && user.username === username)) {
          approvedInterests.push(...userInterests[username]);
          userReferenceTable[username] = convertUserToPublic(resolvedUser);

          for (let j = 0; j < userInterests[username].length; j += 1) {
            const { route } = userInterests[username][j];

            routes[route] = true;
          }
        }
      }

      // Find all routes.
      const foundRoutes = await Handler.database.route.find({
        _id: {
          $in: Object.keys(routes),
        },
      });

      // Reduce all linking tables.
      res.status(200).send({
        interests: approvedInterests,
        routes: (await foundRoutes).reduce((acc, route) => ({
          ...acc,
          [route._id]: route,
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