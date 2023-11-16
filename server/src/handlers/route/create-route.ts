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
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
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
  Route,
} from '../../types';

/**
 * Creates a new route.
 */
export class CreateRouteHandler extends Handler {
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
        name,
        location,
        type,
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
      if (!name) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('name', 'route'),
        });
        return;
      }
      if (!location) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('location', 'route'),
        });
        return;
      }
      if (!type) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('type', 'route'),
        });
        return;
      }

      // Retrieve existing entries.
      const promises = [
        Handler.database.location.findOne({
          _id: limitString(`${location}`, 1000),
        }),
        Handler.database.route.findOne({
          name: limitString(name, 1000),
          location: limitString(location, 1000),
          type: limitString(type, 1000),
        }),
      ];

      const [
        existingLocation,
        existingRoute,
      ] = await Promise.all(promises);

      // Find and ensure location exists.
      if (!existingLocation) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('location', 'id', location),
        });
        return;
      }

      // Ensure route has not already been recorded.
      if (existingRoute) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('route', 'name', name),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        name: limitString(name, 1000),
        location: limitString(location, 1000),
        type: sanitizeRouteType(type),
        multiPitch: sanitizeBoolean(multiPitch),
        altNames: limitStringArray(altNames, 1000),
        state: limitString(state, 2),
        area: limitString(area, 1000),
        href: sanitizeRouteHref(href),
        grade: sanitizeGrade(grade),
        subGrade: sanitizeSubGrade(subGrade),
        danger: sanitizeDanger(danger),
        media: sanitizeMedia(media),
        updated: Date.now(),
        submitted: user.username,
      } as Route;

      // Insert route.
      const valid = await Handler.database.route.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted route.
      const route = await Handler.database.route.findOne({
        name: limitString(name, 1000),
        location: limitString(location, 1000),
        type: sanitizeRouteType(type),
      });

      res.status(201).send({
        route,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}