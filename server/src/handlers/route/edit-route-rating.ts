// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  sanitizeGrade,
  sanitizeRating,
  sanitizeSubGrade,
} from '../../config';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  QueryUpdate,
} from '../../types';

/**
 * Edits a user's rating of a route.
 */
export class EditRouteRatingHandler extends Handler {
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
        id,
        suggestedGrade = -2,
        suggestedSubGrade = 0,
        rating = -1,
      } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'rating'),
        });
        return;
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Find and ensure rating exists.
      const existing = await Handler.database.rating.findOne(query);
      if (existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('rating', 'id', id),
        });
        return;
      }

      // Ensure user has permission to change this rating.
      if (existing.user !== user.username) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as QueryUpdate;
      if ('suggestedGrade' in req.body) {
        update.suggestedGrade = sanitizeGrade(suggestedGrade);
      }
      if ('suggestedSubGrade' in req.body) {
        update.suggestedSubGrade = sanitizeSubGrade(suggestedSubGrade);
      }
      if ('rating' in req.body) {
        update.rating = sanitizeRating(rating);
      }

      // Update rating.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.rating.update(
          query,
          update,
        );
      }

      // Retrieve updated rating.
      const newRating = await Handler.database.rating.findOne(query);

      res.status(200).send({
        rating: newRating,
      });

    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}