// Local Imports
import {
  limitString,
  limitStringArray,
  randomColor,
  sanitizeAreaHref,
  sanitizeAreaType,
  sanitizeMedia,
} from '../../config';
import {
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
 * Edits an area.
 */
export class EditAreaHandler extends Handler {
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
        location = '',
        altNames = [],
        parent = '',
        type = 'area',
        color = randomColor(),
        href = {},
        media = [] as Media[],
      } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'area'),
        });
        return;
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Find and ensure area exists.
      const existing = await Handler.database.area.findOne(query);
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('area', 'id', id),
        });
        return;
      }

      // Ensure user has permission to change this area.
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
      if ('location' in req.body) {
        update.location = limitString(location, 1000);
      }
      if ('altNames' in req.body) {
        update.altNames = limitStringArray(altNames, 1000);
      }
      if ('parent' in req.body) {
        update.parent = limitString(parent, 1000);
      }
      if ('type' in req.body) {
        update.type = sanitizeAreaType(type);
      }
      if ('color' in req.body) {
        update.color = color ? limitString(color, 8) : randomColor();
      }
      if ('href' in req.body) {
        update.href = sanitizeAreaHref(href);
      }
      if ('media' in req.body) {
        update.media = sanitizeMedia(media as any[]);
      }
      
      // Update area.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.area.update(
          query,
          update,
        );
      }

      // Retrieve updated area.
      const area = await Handler.database.area.findOne(query);

      res.status(200).send({
        area,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
