// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';
import { convertUserToPublic } from '../../helpers/authentication';

/**
 * Handler for retrieving a user.
 */
export class GetUserHandler extends Handler {
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
      const { id } = req.body;

      // Are the required fields provided?
      if (!id) {
        return res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'id'),
        });
      }

      const user = await Handler.database.user.findById(id);

      res.status(200).send({
        user: convertUserToPublic(user),
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
