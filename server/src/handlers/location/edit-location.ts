// Local Imports
import {
  MESSAGE_HANDLER_INVALID_PARAMETER_TYPE,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  limitString,
  sanitizeBoolean,
  sanitizeLocationHref,
  sanitizeMedia,
} from '../../config';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  QueryUpdate,
} from '../../types';

/**
 * Edits a location's data.
 */
export class EditLocationHandler extends Handler {
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
        name = '',
        outdoors = false,
        state = '##',
        address = '',
        color = '',
        href = {},
        media = [],
      } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'location'),
        });
        return;
      }
      if (typeof outdoors !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('outdoors', 'boolean'),
        });
        return;
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Find and ensure location exists.
      const existing = await Handler.database.location.findOne(query);
      if (existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('location', 'id', id),
        });
        return;
      }

      // Ensure user has permission to change this location.
      if (existing.submitted !== user.username && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as QueryUpdate;
      if ('name' in req.body) {
        update.name = limitString(name, 1000);
      }
      if ('outdoors' in req.body) {
        update.outdoors = sanitizeBoolean(outdoors);
      }
      if ('state' in req.body) {
        update.state = limitString(state, 2);
      }
      if ('address' in req.body) {
        update.address = limitString(address, 10000);
      }
      if ('color' in req.body) {
        update.color = limitString(color, 8);
      }
      if ('href' in req.body) {
        update.href = sanitizeLocationHref(href);
      }
      if ('media' in req.body) {
        update.media = sanitizeMedia(media);
      }

      // Update location.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.location.update(
          query,
          update,
        );
      }

      // Retrieve updated location.
      const location = await Handler.database.location.findOne(query);

      res.status(200).send({
        location,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}