// Local Imports
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

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
      // Verify current user session.
      const user = await validate(
        req,
        Handler.database,
      );

      // If no session detected, return nothing.
      if (!user) {
        res.status(200).send({
          user: null,
        });
        return;
      }
      
      // Return current user's session info.
      res.status(200).send({
        user: convertUserToPublic(user),
      });
    } catch (error) {
      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
