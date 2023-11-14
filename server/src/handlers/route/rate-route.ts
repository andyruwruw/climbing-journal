// Local Imports
import {
  IS_NUMBER,
  limitString,
  sanitizeGrade,
  sanitizeRating,
  sanitizeSubGrade,
} from '../../config';
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_HANDLER_INVALID_PARAMETER_TYPE,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_ITEM_MISSING, MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Rating,
} from '../../types';

/**
 * Rates a route.
 */
export class RateRouteHandler extends Handler {
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
        route,
        suggestedGrade = -2,
        suggestedSubGrade = 0,
        notes = '',
        rating = 0,
      } = req.body;

      // Ensure valididty of parameters.
      if (!route) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'route'),
        });
        return;
      }
      if ('rating' in req.body && typeof rating === 'string' && !IS_NUMBER.test(rating)) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('rating', 'number'),
        });
        return;
      }

      // Retrieve existing entries.
      const promises = [
        Handler.database.route.findOne({
          _id: limitString(route, 100),
        }),
        Handler.database.rating.findOne({
          user: user.username,
          route: limitString(route, 100),
        }),
      ];

      const [
        existingRoute,
        existingRating,
      ] = await Promise.all(promises);

      // Find and ensure route exists.
      if (!existingRoute) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('route', 'id', route),
        });
        return;
      }

      // Ensure user has not already rated this route.
      if (existingRating) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('rating', 'route', route),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        user: user.username,
        route: limitString(route, 100),
        rating: sanitizeRating(rating),
        notes: limitString(notes),
        suggestedGrade: sanitizeGrade(suggestedGrade),
        suggestedSubGrade: sanitizeSubGrade(suggestedSubGrade),
        updated: Date.now(),
      } as Rating;

      // Insert rating.
      const valid = await Handler.database.rating.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted rating.
      const newRating = await Handler.database.rating.findOne({
        user: user.username,
        route: limitString(route, 100),
      });

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