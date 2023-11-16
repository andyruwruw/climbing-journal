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
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  Area,
  ClimbingRequest,
  ClimbingResponse,
  Media,
} from '../../types';

/**
 * Creates a new area.
 */
export class CreateAreaHandler extends Handler {
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
        altNames = [],
        parent = '',
        type = 'area',
        color = randomColor(),
        href = {},
        media = [] as Media[],
      } = req.body;

      // Ensure valididty of parameters.
      if (!name) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('name', 'area'),
        });
        return;
      }
      if (!location) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('location', 'area'),
        });
        return;
      }

      // Check for duplicate name.
      if (await Handler.database.area.findOne({
        name: limitString(name, 1000),
        location: limitString(location, 1000),
      })) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('location', 'name', name),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        name: limitString(name, 1000),
        location: limitString(location, 1000),
        altNames: limitStringArray(altNames, 1000),
        parent: limitString(parent, 1000),
        type: sanitizeAreaType(type),
        color: color ? limitString(color, 8) : randomColor(),
        href: sanitizeAreaHref(href),
        media: sanitizeMedia(media as any[]),
        updated: Date.now(),
        submitted: user.username,
      } as Area;

      // Insert area.
      const valid = await Handler.database.area.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted area.
      const area = await Handler.database.area.findOne({
        name: limitString(name, 1000),
        location: limitString(location, 1000),
      });

      res.status(201).send({
        area,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
