// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Retrieves a user's information.
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
      // Verify current user session.
      const user = await validate(
        req,
        Handler.database,
      );

      const { username } = req.query;

      // Ensure valididty of parameters.
      if (!username) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('username', 'user'),
        });
        return;
      }

      const existing = await Handler.database.user.findOne({
        username,
      });

      // Does the user have permission to do this action?
      if (existing.username !== user.username
        && !user.admin
        && existing.privacy === 'private') {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      res.status(200).send({
        user: convertUserToPublic(existing),
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}