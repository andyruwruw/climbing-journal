// Local Imports
import {
  IS_NUMBER,
  limitString,
  sanitizeBoolean,
  sanitizeDate,
  sanitizeShoesStatus,
} from '../../config';
import {
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
  QueryUpdate,
} from '../../types';

/**
 * Edits a user's shoe log.
 */
export class EditShoesHandler extends Handler {
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
        brand = '',
        model = '',
        volume = 'HV',
        sizeUS = 0,
        sizeEU = 0,
        acquired = 'New',
        status = 'New',
        resoled = false,
        resoleDate = 0,
        resoleRubber = '',
        notes = '',
      } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'shoe'),
        });
        return;
      }
      if (date && typeof date === 'string' && !IS_NUMBER.test(`${date}`)) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('date', 'number'),
        });
        return;
      }

      // Find and ensure shoe exists.
      const existing = await Handler.database.shoes.findOne({ _id: `${id}` });
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('shoe', 'id', id),
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
      const update = {} as QueryUpdate;
      if ('date' in req.body) {
        update.date = sanitizeDate(date);
      }
      if ('brand' in req.body) {
        update.brand = limitString(brand, 100);
      }
      if ('model' in req.body) {
        update.model = limitString(model, 100);
      }
      if ('volume' in req.body) {
        update.volume = limitString(volume, 100);
      }
      if ('sizeUS' in req.body) {
        update.sizeUS = sanitizeDate(sizeUS);
      }
      if ('sizeEU' in req.body) {
        update.sizeEU = sanitizeDate(sizeEU);
      }
      if ('acquired' in req.body) {
        update.acquired = sanitizeShoesStatus(acquired);
      }
      if ('status' in req.body) {
        update.status = sanitizeShoesStatus(status);
      }
      if ('resoled' in req.body) {
        update.resoled = sanitizeBoolean(resoled);
      }
      if ('resoleDate' in req.body) {
        update.resoleDate = sanitizeDate(resoleDate);
      }
      if ('resoleRubber' in req.body) {
        update.resoleRubber = limitString(resoleRubber, 100);
      }
      if ('notes' in req.body) {
        update.notes = limitString(notes);
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Update shoes.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.shoes.update(
          query,
          update,
        );
      }

      // Retrieve updated shoes.
      const shoes = await Handler.database.shoes.findOne(query);

      res.status(200).send({
        shoes,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}