// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Handler for following another user.
 */
export class FollowUserHandler extends Handler {
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
      const { id } = req.query;

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

      const followee = await Handler.database.user.findById(id as string);

      if (!followee) {
        res.status(400).send({
          error: MESSAGE_ITEM_MISSING('user', 'id', id),
        });
        return;
      }

      const follow = await Handler.database.follow.create(
        user._id,
        id,
      );

      if (!follow) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      res.status(200).send({
        follow,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
