// Local Imports
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
  QueryConditions,
} from '../../types';
import { sanitizeCursorLimit, sanitizeCursorOffset } from '@/config';

/**
 * Retrieves all reviews for a location.
 */
export class GetLocationReviewsHandler extends Handler {
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
        location,
        offset = "0",
        limit = "50",
      } = req.query;

      // Ensure valididty of parameters.
      if (!location) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'location'),
        });
        return;
      }

      // Prepare find query.
      const query = { location: `${location}` } as QueryConditions;
      // Find all reviews.
      const reviews = await Handler.database.review.find(
        query,
        {},
        {
          updated: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      if (reviews.length) {
        res.status(200).send({
          reviews: [],
          users: {},
          average: 0,
        });
        return;
      }

      // Resolve all users.
      const promise = Handler.database.user.find({
        username: {
          $in: reviews.map((review) => review.user),
        },
      });

      // Calculate average.
      const total = reviews.reduce((acc, review) => (acc + review.rating), 0);
      const average = total / reviews.length;

      // Finalize retrieving user objects.
      const users = (await promise).reduce((acc, user) => ({
        ...acc,
        [user.username]: user,
      }), {});

      const approvedReviews = [];
      const userReferenceTable = {};

      // Add reviews if allowed.
      for (let i = 0; i < reviews.length; i += 1) {
        const review = reviews[i];
        const { user: reviewUser } = review;

        if (users[reviewUser].reviewPrivacy !== 'private'
          || user.username === reviewUser) {
          approvedReviews.push(review);
          userReferenceTable[reviewUser] = convertUserToPublic(users[reviewUser]);
        }
      }

      // Reduce all linking tables.
      res.status(200).send({
        reviews: reviews,
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