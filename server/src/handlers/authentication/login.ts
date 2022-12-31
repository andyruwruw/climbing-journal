// Local Imports
import {
  attatchCookie,
  generateToken,
} from '../../helpers/cookie';
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_LOGIN_FAILURE,
} from '../../config/messages';
import { comparePassword, convertUserToPublic } from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Handler for logging a user in.
 */
export class LoginHandler extends Handler {
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
        username,
        password,
      } = req.body;

      // Are the required fields provided?
      if (!username) {
        return res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'username'),
        });
      }
      if (!password) {
        return res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'password'),
        });
      }

      const user = await Handler.database.user.findOne({ username });

      if (!user) {
        res.status(400).send({
          error: MESSAGE_LOGIN_FAILURE,
        });
        return;
      }

      const passwordsMatch = await comparePassword(
        user.password as string,
        password,
      );

      if (!passwordsMatch) {
        res.status(400).send({
          error: MESSAGE_LOGIN_FAILURE,
        });
        return;
      }

      const token = generateToken({
        id: user._id,
        date: (new Date()).getTime(),
      });

      const completed = await Handler.database.token.create(
        user._id,
        token,
      );

      if (!completed) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      attatchCookie(
        res,
        token,
      );

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
