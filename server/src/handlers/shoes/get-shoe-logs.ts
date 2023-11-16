// Local Imports
import {
  limitString,
  sanitizeBoolean,
  sanitizeCursorLimit,
  sanitizeCursorOffset,
  sanitizeDate,
  sanitizeNumber,
  sanitizeShoesStatus,
} from '../../config';
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Dictionary,
  QueryConditions,
  Shoes,
} from '../../types';

/**
 * Retrieves a set of shoe logs.
 */
export class GetShoeLogsHandler extends Handler {
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

      // Retrieve parameters.
      const {
        user: username,
        date = 0,
        before = 0,
        after = 0,
        brand = '',
        model = '',
        volume = '',
        sizeUS = 0,
        sizeEU = 0,
        acquired = 'New',
        status = 'New',
        resoled = false,
        resoleRubber = '',
        offset = '0',
        limit = '50',
      } = req.query;

      // Prepare find query.
      const query = {} as QueryConditions;
      if ('user' in req.query) {
        query.user = limitString(username, 100);
      }
      if (date !== "-1" || before !== "-1" || after !== "-1") {
        query.date = {};

        if (before !== "-1" || after !== "-1") {
          if (before !== "-1") {
            query.date.$lt = sanitizeDate(before);
          }
          if (after !== "-1") {
            query.date.$gt = sanitizeDate(after);
          }
        } else {
          query.date = sanitizeDate(date);
        }
      }
      if ('brand' in req.query) {
        query.brand = limitString(brand, 100);
      }
      if ('model' in req.query) {
        query.model = limitString(model, 100);
      }
      if ('volume' in req.query) {
        query.volume = limitString(volume, 100);
      }
      if ('sizeUS' in req.query) {
        query.sizeUS = sanitizeNumber(sizeUS);
      }
      if ('sizeEU' in req.query) {
        query.sizeEU = sanitizeNumber(sizeEU);
      }
      if ('acquired' in req.query) {
        query.acquired = sanitizeShoesStatus(acquired);
      }
      if ('status' in req.query) {
        query.status = sanitizeShoesStatus(status);
      }
      if ('resoled' in req.query) {
        query.resoled = sanitizeBoolean(resoled);
      }
      if ('resoleRubber' in req.query) {
        query.resoleRubber = limitString(resoleRubber, 100);
      }

      // Find all shoes.
      const shoes = await Handler.database.shoes.find(
        query,
        {},
        {
          date: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      // Prepare user table.
      const userShoes = {} as Dictionary<Shoes[]>;

      // For every session, find the user.
      for (let i = 0; i < shoes.length; i += 1) {
        const shoeLog = shoes[i];
        const { user: sessionUser } = shoeLog;

        // Log shoe-log under user.
        if (!(sessionUser in userShoes)) {
          userShoes[sessionUser] = [shoeLog];
        } else {
          userShoes[sessionUser].push(shoeLog);
        }
      }

      // Resolve all users.
      const users = await Handler.database.user.find({
        username: {
          $in: Object.keys(userShoes),
        },
      });

      const approvedShoes = [];
      const userReferenceTable = {};

      // Check if each shoe-log is allowed.
      for (let i = 0; i < users.length; i += 1) {
        const resolvedUser = users[i];

        if (!resolvedUser) {
          continue;
        }

        const { username } = resolvedUser;

        // If approved
        if ((user && user.admin)
          || resolvedUser.shoesPrivacy !== 'private'
          || (user && user.username === username)) {
          approvedShoes.push(...userShoes[username]);
          userReferenceTable[username] = convertUserToPublic(resolvedUser);
        }
      }

      // Reduce all linking tables.
      res.status(200).send({
        shoes: approvedShoes,
        users: userReferenceTable,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}