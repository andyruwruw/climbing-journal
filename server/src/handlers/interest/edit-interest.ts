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
  overrideAdminQuery,
  sanitizeDate,
  sanitizeInterestStatus,
} from '../../config';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  DatabaseColumnTypes,
  Dictionary,
} from '../../types';

/**
 * Edits an existing interest.
 */
export class EditInterestHandler extends Handler {
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
        date = 0,
        route = '',
        status = 'interested',
        notes = '',
      } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'interest'),
        });
        return;
      }
      if (date && !IS_NUMBER.test(`${date}`)) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('date', 'number'),
        });
        return;
      }

      // Find and ensure interest exists.
      const existing = await Handler.database.interest.findOne({ _id: `${id}` });
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('interest', 'id', `${id}`),
        });
        return;
      }

      // Does the user have permission to do this action?
      if (existing.user !== user.username && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as Dictionary<DatabaseColumnTypes>;
      if ('date' in req.body) {
        update.date = sanitizeDate(date);
      }
      if ('route' in req.body) {
        update.route = limitString(route, 1000);
      }
      if ('status' in req.body) {
        update.status = sanitizeInterestStatus(status);
      }
      if ('notes' in req.body) {
        update.notes = limitString(notes);
      }

      // Prepare find query.
      const query = overrideAdminQuery({
        _id: `${id}`,
      }, user);

      // Update attempt.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.interest.update(
          query,
          update,
        );
      }

      // Retrieve updated attempt.
      const interest = Handler.database.interest.findOne(query);

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
