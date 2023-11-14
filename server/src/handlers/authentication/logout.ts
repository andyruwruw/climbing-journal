// Local Imports
import {
  attatchCookie,
  getCookie,
} from '../../helpers/cookie';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Handler for logging a user out.
 */
export class LogoutHandler extends Handler {
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
      const user = await validate(req, Handler.database);
      const cookie = getCookie(req);

      // No session detected.
      if (!cookie || !user) {
        res.status(200).send({});
        return;
      }

      // Delete the session token.
      await Handler.database.token.delete({
        user: user.username as string,
        token: cookie,
      });

      // Send back dead token.
      attatchCookie(
        res,
        '',
      );

      res.status(200).send({});
    } catch (error) {
      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
