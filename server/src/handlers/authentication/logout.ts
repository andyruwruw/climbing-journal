// Local Imports
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';
import { attatchCookie, getCookie } from '../../helpers/cookie';
import { MESSAGE_LOGOUT_FAILURE } from '../../config/messages';

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
      const cookie = getCookie(req);
      const user = await validate(cookie, Handler.database);

      if (!cookie || !user) {
        return res.status(400).send({
          error: MESSAGE_LOGOUT_FAILURE,
        });
      }

      const affectedRows = await Handler.database.token.delete({
        user: user._id,
        token: cookie,
      });

      if (affectedRows === 0) {
        return res.status(400).send({
          error: MESSAGE_LOGOUT_FAILURE,
        });
      }

      attatchCookie(
        res,
        '',
      );

      res.status(200).send({});
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: 'Internal Server Error',
      });
    }
  }
}
