// Local Imports
import {
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
  QueryUpdate,
  Review,
} from '../../types';

/**
 * Edits a location review.
 */
export class EditLocationReviewHandler extends Handler {
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
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'location'),
        });
        return;
      }
      if (rating && (typeof rating === 'string' && !IS_NUMBER.test(rating))) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('rating', 'number'),
        });
        return;
      }

      // Prepare find query.
      const query = {
        user: user.username,
        location: `${location}`,
      };

      // Retrieve existing entries.
      const promises = [
        Handler.database.location.findOne({
          _id: `${location}`,
        }),
        Handler.database.review.findOne(query),
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

      // Find and ensure review exists.
      if (!existingReview) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('review', 'location', location),
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as QueryUpdate;
      if ('rating' in req.body) {
        update.rating = sanitizeRating(rating);
      }
      if ('notes' in req.body) {
        update.notes = limitString(notes);
      }

      // Update location.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.review.update(
          query,
          update,
        );
      }

      // Retrieve updated review.
      const review = await Handler.database.review.findOne(query);

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