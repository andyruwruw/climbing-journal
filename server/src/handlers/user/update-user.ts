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
 * Handler for updating a user.
 */
export class UpdateUserHandler extends Handler {
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
        name = undefined,
        password = undefined,
        started = undefined,
        height = undefined,
        span = undefined,
        weight = undefined,
        image = undefined,
      } = req.body;

      // Are the required fields provided?
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'id'),
        });
        return;
      }

      const user = await validate(
        req,
        Handler.database,
      );

      if (!user) {
        res.status(400).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const update = {} as UpdateQuery;

      if (name !== undefined && name !== user.name && name.length > 0 && name.length < 100) {
        update.name = name;
      }
      if (password !== undefined && password !== user.password && password.length > 0 && password.length < 100) {
        update.password = password;
      }
      if (started !== undefined && started !== user.started && started > 0) {
        update.started = started;
      }
      if (height !== undefined && height !== user.height && height > 0) {
        update.height = height;
      }
      if (span !== undefined && span !== user.span) {
        update.span = span;
      }
      if (weight !== undefined && weight !== user.weight && weight > 0) {
        update.weight = weight;
      }
      if (image !== undefined && image !== user.image && image.length > 0) {
        update.image = image;
      }

      const affectedRows = await Handler.database.user.updateOne({
        _id: user._id as string,
      }, update);

      if (!affectedRows) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const newUser = await Handler.database.user.findById(user._id as string);

      res.status(200).send({
        user: newUser,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
