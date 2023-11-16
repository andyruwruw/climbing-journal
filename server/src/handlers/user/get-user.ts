// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
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

      console.log('body', req.body);
      console.log('query', req.query);
      console.log('cookies', req.cookies);

      const { username } = Object.assign({}, req.query);

      console.log(username);

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

      // Does the user exist?
      if (!existing) {
        res.status(404).send({
          message: MESSAGE_ITEM_MISSING('user', 'username', username),
        });
        return;
      }

      // Does the user have permission to do this action?
      if (existing.username !== (user ? user.username : '')
        && !(user && user.admin)
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
      console.log(error);
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}