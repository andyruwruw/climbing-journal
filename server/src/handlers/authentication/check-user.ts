// Local Imports
import { Handler } from '../handler';
import { convertUserToPublic, validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';

/**
 * Handler for checking if the user is already logged in.
 */
export class CheckUserHandler extends Handler {
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
      const user = await validate(
        req,
        Handler.database,
      );

      if (!user) {
        res.status(200).send({
          user: null,
        });
        return;
      }

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
