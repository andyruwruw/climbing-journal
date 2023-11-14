// Local Imports
import {
  limitString,
  sanitizeCursorLimit,
  sanitizeCursorOffset,
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
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Retrieves ratings for route.
 */
export class GetRouteRatingsHandler extends Handler {
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
        route,
        limit = "50",
        offset = "0",
      } = req.query;

      // Ensure valididty of parameters.
      if (!route) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'route'),
        });
        return;
      }

      // Prepare find query.
      const query = { route: limitString(route, 1000) };

      // Find all attempts.
      const ratings = await Handler.database.rating.find(
        query,
        {},
        {
          updated: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      if (ratings.length) {
        res.status(200).send({
          ratings: [],
          users: {},
          average: 0,
        });
        return;
      }

      // Resolve all users.
      const promise = Handler.database.user.find({
        username: {
          $in: ratings.map((review) => review.user),
        },
      });

      // Calculate average.
      const total = ratings.reduce((acc, review) => (acc + review.rating), 0);
      const average = total / ratings.length;

      // Finalize retrieving user objects.
      const users = (await promise).reduce((acc, user) => ({
        ...acc,
        [user.username]: user,
      }), {});

      const approvedRatings = [];
      const userReferenceTable = {};

      // Add ratings if allowed.
      for (let i = 0; i < ratings.length; i += 1) {
        const rating = ratings[i];
        const { user: ratingUser } = rating;

        if (users[ratingUser].ratingPrivacy !== 'private'
          || user.username === ratingUser) {
          approvedRatings.push(rating);
          userReferenceTable[ratingUser] = convertUserToPublic(users[ratingUser]);
        }
      }

      // Reduce all linking tables.
      res.status(200).send({
        ratings: approvedRatings,
        users: userReferenceTable,
        average,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}