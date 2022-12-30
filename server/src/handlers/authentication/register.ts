// Local Imports
import {
  attatchCookie,
  generateToken,
} from '../../helpers/cookie';
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_CREATE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { convertUserToPublic } from '../../helpers/authentication';
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
        name,
        username,
        password,
        started = -1,
        height = -1,
        span = 100,
        weight = -1,
      } = req.body;

      // Are the required fields provided?
      if (!name) {
        return res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'name'),
        });
      }
      if (!username) {
        return res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'username'),
        });
      }
      if (!password) {
        return res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'password'),
        });
      }

      // Check for duplicate username.
      const existing = await Handler.database.user.findOne({ username });

      if (existing) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('user', 'username', username),
        });
        return;
      }

      // Create the user.
      const user = await Handler.database.user.create(
        name,
        username,
        password,
        started,
        height,
        span,
        weight,
      );

      if (!user) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Generate a login token.
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
