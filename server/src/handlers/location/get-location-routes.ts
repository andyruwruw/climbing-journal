// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  sanitizeCursorLimit,
  sanitizeCursorOffset,
} from '../../config';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  QueryConditions,
} from '../../types';

/**
 * Retrieves a location's routes.
 */
export class GetLocationRoutesHandler extends Handler {
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
      // Retrieve parameters.
      const {
        location,
        limit = "50",
        offset = "0",
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

      // Find all routes.
      const routes = await Handler.database.route.find(
        query,
        {},
        {
          name: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      res.status(200).send({
        routes,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}