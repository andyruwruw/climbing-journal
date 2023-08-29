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
  DatabaseColumnTypes,
} from '../../types';

/**
 * Handler for registering a new user.
 */
export class RegisterHandler extends Handler {
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
      console.log(req.body);
      const {
        name,
        username,
        password,
        started = -1,
        height = -1,
        span = 100,
        weight = -1,
        image = '',
        privacy = 'public',
      } = req.query;

      // Are the required fields provided?
      if (!name) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'name'),
        });
        return;
      }
      if (!username) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'username'),
        });
        return;
      }
      if (!password) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'password'),
        });
        return;
      }

      // Check for duplicate username.
      const existing = await Handler.database.user.findOne({ username: username as unknown as string });

      if (existing) {
        console.log('exists');
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
        image,
        privacy,
      );

      if (!user) {
        console.log('no user created)');
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
        console.log('not created)');
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
