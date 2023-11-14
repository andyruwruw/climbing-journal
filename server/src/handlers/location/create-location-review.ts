// Local Imports
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_HANDLER_INVALID_PARAMETER_TYPE,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  IS_NUMBER,
  limitString,
  sanitizeRating,
} from '../../config';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Review,
} from '../../types';

/**
 * Creates a new location review.
 */
export class CreateLocationReviewHandler extends Handler {
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

      // This endpoint requires authentication.
      if (!user) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Retrieve parameters.
      const {
        location,
        rating,
        notes,
      } = req.body;

      // Ensure valididty of parameters.
      if (!location) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'review'),
        });
        return;
      }
      if (!rating) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('rating', 'review'),
        });
        return;
      }
      if (typeof rating === 'string' && !IS_NUMBER.test(rating)) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('rating', 'number'),
        });
        return;
      }

      // Retrieve existing entries.
      const promises = [
        Handler.database.location.findOne({
          _id: limitString(location, 100),
        }),
        Handler.database.review.findOne({
          user: user.username,
          location: `${location}`,
        }),
      ];

      const [
        existingLocation,
        existingReview,
      ] = await Promise.all(promises);

      // Find and ensure location exists.
      if (!existingLocation) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('location', 'id', location),
        });
        return;
      }

      // Ensure user has not already reviewed this location.
      if (existingReview) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('review', 'location', location),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        user: user.username,
        location: `${location}`,
        rating: sanitizeRating(rating),
        notes: limitString(notes),
        updated: Date.now(),
      } as Review;

      // Insert review.
      const valid = await Handler.database.review.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted review.
      const review = await Handler.database.review.findOne({
        user: user.username,
        location: `${location}`,
      });

      res.status(200).send({
        review,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}