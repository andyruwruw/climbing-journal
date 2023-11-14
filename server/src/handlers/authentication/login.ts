// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_LOGIN_FAILURE,
} from '../../config/messages';
import {
  attatchCookie,
  generateToken,
} from '../../helpers/cookie';
import {
  comparePassword,
  convertUserToPublic,
} from '../../helpers/authentication';
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
      } = req.query;

      // Are the required fields provided?
      if (!username) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'username'),
        });
        return;
      }
      if (!password) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'password'),
        });
        return;
      }

      // Does the user by this username exist?
      const user = await Handler.database.user.findOne({
        username: username as string,
      });
      if (!user) {
        res.status(400).send({
          error: MESSAGE_LOGIN_FAILURE,
        });
        return;
      }

      // Compare password hashes
      const passwordsMatch = await comparePassword(
        user.password as string,
        password as string,
      );

      // Login failed, password mismatch.
      if (!passwordsMatch) {
        res.status(400).send({
          error: MESSAGE_LOGIN_FAILURE,
        });
        return;
      }

      // Generate a new session token.
      const token = generateToken({
        user: user.username,
        date: Date.now(),
      });
      const completed = await Handler.database.token.create({
        user: user.username,
        token,
        created: Date.now(),
      });

      if (!completed) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Send back user and session.
      attatchCookie(
        res,
        token,
      );

      res.status(201).send({
        user: convertUserToPublic(user),
      });
    } catch (error) {
      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
