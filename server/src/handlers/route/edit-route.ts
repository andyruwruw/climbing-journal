// Local Imports
import {
  limitString,
  limitStringArray,
  sanitizeBoolean,
  sanitizeDanger,
  sanitizeGrade,
  sanitizeMedia,
  sanitizeRouteHref,
  sanitizeRouteType,
  sanitizeSubGrade,
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
  DatabaseColumnTypes,
  Dictionary,
} from '../../types';

/**
 * Edits a route's information.
 */
export class EditRouteHandler extends Handler {
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
        type = 'boulder',
        multiPitch = false,
        altNames = [],
        state = '##',
        area = '',
        href = {},
        grade = -2,
        subGrade = 0,
        danger = 0,
        media = [],
      } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'route'),
        });
        return;
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Find and ensure route exists.
      const existing = await Handler.database.route.findOne(query);
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('route', 'id', id),
        });
        return;
      }

      // Does the user have permission to do this action?
      if (existing.submitted !== user.username && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as Dictionary<DatabaseColumnTypes>;
      if ('name' in req.body) {
        update.name = limitString(name, 1000);
      }
      if ('altNames' in req.body) {
        update.altNames = limitStringArray(altNames);
      }
      if ('type' in req.body) {
        update.type = sanitizeRouteType(type);
      }
      if ('location' in req.body) {
        const existingLocation = await Handler.database.location.findOne({
          _id: limitString(`${location}`, 1000),
        });

        if (existingLocation) {
          update.location = `${location}`;
        }
      }
      if ('multiPitch' in req.body) {
        update.multiPitch = sanitizeBoolean(multiPitch);
      }
      if ('state' in req.body) {
        update.state = limitString(state, 2);
      }
      if ('area' in req.body) {
        const existingArea = await Handler.database.area.findOne({
          _id: limitString(`${area}`, 1000),
        });

        if (existingArea && existingArea.location === existing.location) {
          update.area = `${area}`;
        }
      }
      if ('href' in req.body) {
        update.href = sanitizeRouteHref(href);
      }
      if ('grade' in req.body) {
        update.grade = sanitizeGrade(grade);
      }
      if ('subGrade' in req.body) {
        update.subGrade = sanitizeSubGrade(subGrade);
      }
      if ('danger' in req.body) {
        update.danger = sanitizeDanger(danger);
      }
      if ('media' in req.body) {
        update.media = sanitizeMedia(media);
      }

      // Update route.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.route.update(
          query,
          update,
        );
      }

      // Retrieve updated route.
      const route = await Handler.database.route.findOne(query);

      res.status(200).send({
        route,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}