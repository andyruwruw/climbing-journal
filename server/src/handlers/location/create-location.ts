// Local Imports
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_HANDLER_INVALID_PARAMETER_TYPE,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  limitString,
  sanitizeLocationHref,
  sanitizeMedia,
} from '../../config';
import { validate } from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Location,
} from '../../types';

/**
 * Creates a new location.
 */
export class CreateLocationHandler extends Handler {
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
        outdoors = false,
        state = '##',
        address = '',
        color = '',
        href = {},
        media = [],
      } = req.body;

      // Ensure valididty of parameters.
      if (!name) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('name', 'location'),
        });
        return;
      }
      if (typeof outdoors !== 'boolean') {
        res.status(400).send({
          message: MESSAGE_HANDLER_INVALID_PARAMETER_TYPE('outdoors', 'boolean'),
        });
        return;
      }

      // Check for duplicate name.
      if (await Handler.database.location.findOne({
        name: limitString(name, 1000),
        outdoors,
        state: limitString(state, 2),
        address: limitString(address, 10000),
      })) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('location', 'name', name),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        name: limitString(name, 1000),
        outdoors,
        state: limitString(state, 2),
        address: limitString(address, 10000),
        color: limitString(color, 8),
        href: sanitizeLocationHref(href),
        media: sanitizeMedia(media),
        submitted: user.username,
        updated: Date.now(),
      } as Location;

      // Insert location.
      const valid = await Handler.database.location.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted location.
      const location = await Handler.database.location.findOne({
        name: limitString(name, 1000),
        outdoors,
        state: limitString(state, 2),
        address: limitString(address, 10000),
      });

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
