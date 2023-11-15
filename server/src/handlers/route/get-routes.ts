// Local Imports
import {
  ATTEMPT_ATTEMPT_STATUS,
  SENT_ATTEMPT_STATUS,
  limitString,
  limitStringArray,
  sanitizeBoolean,
  sanitizeCursorLimit,
  sanitizeCursorOffset,
  sanitizeDanger,
  sanitizeGrade,
  sanitizeRating,
  sanitizeRouteType,
  sanitizeSubGrade,
} from '../../config';
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  QueryConditions,
} from '../../types';

/**
 * Retrieves a set of routes.
 */
export class GetRoutesHandler extends Handler {
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
        ids = [],
        location = '',
        area = '',
        state = '##',
        multiPitch = 'false',
        type = 'boulder',
        grade = -2,
        subGrade = 0,
        danger = 0,
        rating = 0,
        submitted = 'false',
        interested = 'false',
        attempted = 'false',
        sent = 'false',
        limit = 50,
        offset = 0,
      } = req.query;

      if (('submitted' in req.query
        || 'interested' in req.query
        || 'attempted' in req.query
        || 'sent' in req.query)
        && !user) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
      }

      const mustFit = [] as string[][];
      const promises = [] as Promise<any>[];

      if ('interested' in req.query && sanitizeBoolean(interested)) {
        promises.push(Handler.database.interest.find({
          user: user.username,
        }).then((interests) => {
          mustFit.push(interests.map((interest) => interest.route));
        }));
      }
      if ('attempted' in req.query && sanitizeBoolean(attempted)) {
        promises.push(Handler.database.attempt.find({
          user: user.username,
          status: {
            $in: ATTEMPT_ATTEMPT_STATUS,
          },
        }).then((attempts) => {
          mustFit.push(attempts.map((attempt) => attempt.route));
        }));
      }
      if ('sent' in req.query && sanitizeBoolean(sent)) {
        promises.push(Handler.database.attempt.find({
          user: user.username,
          status: {
            $in: SENT_ATTEMPT_STATUS,
          },
        }).then((attempts) => {
          mustFit.push(attempts.map((attempt) => attempt.route));
        }));
      }

      await Promise.all(promises);

      const determinedIds = [];

      if (!mustFit.length) {
        determinedIds.push(...limitStringArray(ids, 100));
      } else {
        for (let i = 0; i < mustFit[0].length; i += 1) {
          const id = mustFit[0][i];

          let valid = true;

          for (let j = 1; j < mustFit.length; j += 1) {
            if (!mustFit[j].includes(id)) {
              valid = false;
              break;
            }
          }

          if (valid) {
            determinedIds.push(id);
          }
        }
      }

      // Prepare find query.
      const query = {} as QueryConditions;
      if (determinedIds.length) {
        query._id = { $in: determinedIds };
      }
      if ('location' in req.query) {
        query.location = limitString(location, 100);
      }
      if ('submitted' in req.query) {
        query.submitted = user.username;
      }
      if ('area' in req.query) {
        query.area = limitString(area, 100);
      }
      if ('state' in req.query) {
        query.state = limitString(state, 2);
      }
      if ('multiPitch' in req.query) {
        query.multiPitch = sanitizeBoolean(multiPitch);
      }
      if ('type' in req.query) {
        query.type = sanitizeRouteType(type);
      }
      if ('grade' in req.query) {
        query.grade = {
          $gte: sanitizeGrade(grade),
        };
      }
      if ('subGrade' in req.query) {
        query.subGrade = {
          $gte: sanitizeSubGrade(subGrade),
        };
      }
      if ('danger' in req.query) {
        query.danger = {
          $gte: sanitizeDanger(danger),
        };
      }
      if ('rating' in req.query) {
        query.rating = {
          $gte: sanitizeRating(rating),
        };
      }

      // Find routes.
      const routes = await Handler.database.route.find(
        query,
        {},
        {
          grade: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );


    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}