// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';
import { generateEmptyMaxSends, limitString, limitStringArray, sanitizeBoolean, sanitizeDate, sanitizeMaxSends, sanitizeMedia } from '../../config';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Dictionary,
  Media,
  Session,
} from '../../types';

/**
 * Logs a new session.
 */
export class LogSessionHandler extends Handler {
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
        location,
        date,
        start = 0,
        end = 0,
        duration = 0,
        areas = [] as string[],
        state = '##',
        bouldering = false,
        sport = false,
        trad = false,
        topRope = false,
        aid = false,
        ice = false,
        mixed = false,
        alpine = false,
        outdoor = false,
        felt = 0,
        max = generateEmptyMaxSends(),
        notes = '',
        partners = [] as string[],
        media = [] as Media[],
      } = req.body;

      // Ensure valididty of parameters.
      if (!location) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('location', 'session'),
        });
        return;
      }
      if (!date) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('location', 'route'),
        });
        return;
      }

      // Find and ensure location exists.
      if (!(await Handler.database.location.findOne({
        _id: `${location}`,
      }))) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('location', 'id', location),
        });
        return;
      }

      const existingAreas = (await Handler.database.area.find({
        _id: {
          $in: limitStringArray(areas, 100),
        },
      })).reduce((areas, area) => {
        areas[area._id] = true;
        return areas;
      }, {} as Dictionary<boolean>);

      // Prepare and sanitize insert query.
      const data = {
        user: user.username,
        location: limitString(location, 100),
        date: sanitizeDate(date),
        start: sanitizeDate(start),
        end: sanitizeDate(end),
        duration: sanitizeDate(duration),
        areas: Object.keys(existingAreas),
        state: limitString(state, 2),
        bouldering: sanitizeBoolean(bouldering),
        sport: sanitizeBoolean(sport),
        trad: sanitizeBoolean(trad),
        topRope: sanitizeBoolean(topRope),
        aid: sanitizeBoolean(aid),
        ice: sanitizeBoolean(ice),
        mixed: sanitizeBoolean(mixed),
        alpine: sanitizeBoolean(alpine),
        outdoor: sanitizeBoolean(outdoor),
        felt: sanitizeDate(felt),
        max: sanitizeMaxSends(max),
        notes: limitString(notes),
        partners: limitStringArray(partners, 100),
        media: sanitizeMedia(media),
        updated: Date.now(),
      } as Session;

      // Insert session.
      const valid = await Handler.database.session.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted session.
      const session = await Handler.database.session.findOne(data);

      res.status(200).send({
        session,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}