// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  limitString,
  sanitizeInterestStatus,
} from '../../config';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Logs new interest.
 */
export class LogInterestHandler extends Handler {
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
        status,
        notes = '',
      } = req.body;

      if (!route) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'interest'),
        });
        return;
      }
      if (!status) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('status', 'interest'),
        });
        return;
      }

      // Find and ensure route exists.
      if (!(await Handler.database.route.findOne({
        _id: `${route}`,
      }))) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('route', 'id', route),
        });
        return;
      }
      
      // Prepare and sanitize insert query.
      const data = {
        user: user.username,
        date: Date.now(),
        route: limitString(route, 1000),
        status: sanitizeInterestStatus(status),
        notes: limitString(notes),
      };

      // Insert interest.
      const valid = await Handler.database.interest.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted interest.
      const interest = await Handler.database.interest.findOne(data);

      res.status(200).send({
        interest,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}