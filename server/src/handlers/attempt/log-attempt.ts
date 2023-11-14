// Local Imports
import {
  IS_NUMBER,
  limitString,
  sanitizeAttemptStatus,
  sanitizeDate,
  sanitizeMedia,
} from '../../config';
import {
  MESSAGE_HANDLER_INVALID_PARAMETER_TYPE,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Logs a new attempt.
 */
export class LogAttemptHandler extends Handler {
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
        date,
        route,
        status,
        notes = '',
        media = [],
      } = req.body;

      // Ensure valididty of parameters.
      if (!date) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('date', 'attempt'),
        });
        return;
      }
      if (!IS_NUMBER.test(`${date}`)) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('date', 'number'),
        });
        return;
      }
      if (!route) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('route', 'attempt'),
        });
        return;
      }
      if (!status) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('status', 'attempt'),
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
        date: sanitizeDate(date),
        route: limitString(route, 1000),
        status: sanitizeAttemptStatus(status),
        notes: limitString(notes),
        media: sanitizeMedia(media),
        updated: Date.now(),
      };

      // Insert attempt.
      const valid = await Handler.database.attempt.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted attempt.
      const attempt = await Handler.database.attempt.findOne(data);

      res.status(200).send({
        attempt,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
