// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  UpdateQuery,
} from '../../types';

/**
 * Handler for editing an existing location.
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
      const {
        id,
        name = null as string | null,
        locale = null as string | null,
        address = null as string | null,
        outdoors = null as boolean | null,
        image = null as string | null,
      } = req.body;

      // Are the required fields provided?
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('location', 'id'),
        });
        return;
      }

      const user = await validate(
        req,
        Handler.database,
      );

      if (!user || !user.admin) {
        res.status(400).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const update = {} as UpdateQuery;

      if (name !== null) {
        update.name = name;
      }
      if (locale !== null) {
        update.locale = locale;
      }
      if (address !== null) {
        update.address = address;
      }
      if (outdoors !== null) {
        update.outdoors = outdoors;
      }
      if (image !== null) {
        update.image = image;
      }

      const success = await Handler.database.location.updateOne({
        _id: id,
      }, update);

      if (!success) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const location = await Handler.database.location.findById(id);

      res.status(200).send({
        location,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
