// Local Imports
import {
  generateEmptyMaxSends,
  limitString,
  limitStringArray,
  sanitizeBoolean,
  sanitizeDate,
  sanitizeMaxSends,
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
  Media,
  QueryUpdate,
} from '../../types';

/**
 * Edits a user's session.
 */
export class EditSessionHandler extends Handler {
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
        location = '',
        date = 0,
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
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'session'),
        });
        return;
      }
      if (typeof bouldering !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('bouldering', 'boolean'),
        });
        return;
      }
      if (typeof sport !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('sport', 'boolean'),
        });
        return;
      }
      if (typeof trad !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('trad', 'boolean'),
        });
        return;
      }
      if (typeof topRope !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('topRope', 'boolean'),
        });
        return;
      }
      if (typeof aid !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('aid', 'boolean'),
        });
        return;
      }
      if (typeof ice !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('ice', 'boolean'),
        });
        return;
      }
      if (typeof mixed !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('mixed', 'boolean'),
        });
        return;
      }
      if (typeof alpine !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('alpine', 'boolean'),
        });
        return;
      }
      if (typeof outdoor !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('outdoor', 'boolean'),
        });
        return;
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Find and ensure session exists.
      const existing = await Handler.database.session.findOne(query);
      if (existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('session', 'id', id),
        });
        return;
      }

      // Ensure user has permission to change this session.
      if (existing.user !== user.username) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as QueryUpdate;
      if ('location' in req.body) {
        const existing = Handler.database.location.findOne({
          _id: limitString(location, 100),
        });

        if (existing) {
          update.location = limitString(location, 1000);
        }
      }
      if ('date' in req.body) {
        update.date = sanitizeDate(date);
      }
      if ('start' in req.body) {
        update.start = sanitizeDate(start);
      }
      if ('end' in req.body) {
        update.end = sanitizeDate(end);
      }
      if ('duration' in req.body) {
        update.duration = sanitizeDate(duration);
      }
      if ('areas' in req.body) {
        update.areas = limitStringArray(areas, 100);
      }
      if ('state' in req.body) {
        update.state = limitString(state, 2);
      }
      if ('bouldering' in req.body) {
        update.bouldering = sanitizeBoolean(bouldering);
      }
      if ('sport' in req.body) {
        update.sport = sanitizeBoolean(sport);
      }
      if ('trad' in req.body) {
        update.trad = sanitizeBoolean(trad);
      }
      if ('topRope' in req.body) {
        update.topRope = sanitizeBoolean(topRope);
      }
      if ('aid' in req.body) {
        update.aid = sanitizeBoolean(aid);
      }
      if ('ice' in req.body) {
        update.ice = sanitizeBoolean(ice);
      }
      if ('mixed' in req.body) {
        update.mixed = sanitizeBoolean(mixed);
      }
      if ('alpine' in req.body) {
        update.alpine = sanitizeBoolean(alpine);
      }
      if ('outdoor' in req.body) {
        update.outdoor = sanitizeBoolean(outdoor);
      }
      if ('felt' in req.body) {
        update.felt = sanitizeDate(felt);
      }
      if ('max' in req.body) {
        update.max = sanitizeMaxSends(max);
      }
      if ('notes' in req.body) {
        update.notes = limitString(notes);
      }
      if ('partners' in req.body) {
        update.partners = limitStringArray(partners, 100);
      }
      if ('media' in req.body) {
        update.media = sanitizeMedia(media);
      }

      // Update session.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.session.update(
          query,
          update,
        );
      }

      // Retrieve updated session.
      const session = await Handler.database.session.findOne(query);

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