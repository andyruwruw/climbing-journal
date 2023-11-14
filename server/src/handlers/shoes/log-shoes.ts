// Local Imports
import {
  IS_NUMBER,
  limitString,
  sanitizeBoolean,
  sanitizeDate,
  sanitizeNumber,
  sanitizeShoesStatus,
} from '../../config';
import {
  MESSAGE_HANDLER_INVALID_PARAMETER_TYPE,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Shoes,
} from '../../types';

/**
 * Creates a shoe-log.
 */
export class LogShoesHandler extends Handler {
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
        date = 0,
        brand,
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
      if (!brand) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('brand', 'shoe'),
        });
        return;
      }
      if (date && typeof date === 'string' && !IS_NUMBER.test(`${date}`)) {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('date', 'number'),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        user: user.username,
        date: sanitizeDate(date),
        model: limitString(model, 100),
        brand: limitString(brand, 100),
        volume: limitString(volume, 100),
        sizeUS: sanitizeNumber(sizeUS),
        sizeEU: sanitizeNumber(sizeEU),
        acquired: sanitizeShoesStatus(acquired),
        status: sanitizeShoesStatus(status),
        resoled: sanitizeBoolean(resoled),
        resoleDate: sanitizeDate(resoleDate),
        resoleRubber: limitString(resoleRubber, 100),
        notes: limitString(notes),
        updated: Date.now(),
      } as Shoes;

      // Insert shoe-log.
      const valid = await Handler.database.shoes.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted shoes.
      const shoes = await Handler.database.shoes.findOne({
        user: user.username,
        brand: data.brand,
        updated: data.updated,
      });

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