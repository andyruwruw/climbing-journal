// Local Imports
import {
  generateEmptyMaxSends,
  limitString,
  sanitizeDate,
  sanitizeMaxSends,
  sanitizeNumber,
  sanitizePrivacy,
} from '../../config';
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_CREATE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import {
  convertUserToPublic,
  hashPassword,
} from '../../helpers/authentication';
import {
  attatchCookie,
  generateToken,
} from '../../helpers/cookie';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  User,
  UserSends,
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
      // Retrieve parameters.
      const {
        username,
        password,
        displayName,
        max = generateEmptyMaxSends(),
        email = '',
        image = '',
        started = 0,
        home = '',
        height = 0,
        span = -100,
        weight = 0,
        age = 0,
        privacy = 'public',
        attemptPrivacy = 'public',
        sessionPrivacy = 'public',
        interestPrivacy = 'public',
        reviewPrivacy = 'public',
        ratingPrivacy = 'public',
        shoesPrivacy = 'public',
      } = req.query;

      // Ensure valididty of parameters.
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
      if (!displayName) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'display name'),
        });
        return;
      }

      // Check for duplicate username.
      if (await Handler.database.user.findOne({ username: username as unknown as string })) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('user', 'username', username),
        });
        return;
      }

      // Prepare insert query.
      const query = {
        username: limitString(username as string, 100),
        password: await hashPassword(password as string),
        displayName: limitString(displayName as string, 100),
        max: sanitizeMaxSends(max as UserSends),
        admin: false,
        href: {},
        email: limitString(email as string, 500),
        image: limitString(image),
        created: Date.now(),
        started: sanitizeDate(started),
        home: limitString(home as string, 500),
        height: sanitizeNumber(height, false, 500, -1, 0),
        span: sanitizeNumber(span, false, 500, sanitizeNumber(height, false, 500, -1, -1) * -1),
        weight: sanitizeNumber(weight, false, NaN, 0, 0),
        age: sanitizeNumber(age, false, NaN, 0, 0),
        privacy: sanitizePrivacy(privacy as string),
        attemptPrivacy: sanitizePrivacy(attemptPrivacy as string),
        sessionPrivacy: sanitizePrivacy(sessionPrivacy as string),
        interestPrivacy: sanitizePrivacy(interestPrivacy as string),
        reviewPrivacy: sanitizePrivacy(reviewPrivacy as string),
        ratingPrivacy: sanitizePrivacy(ratingPrivacy as string),
        shoesPrivacy: sanitizePrivacy(shoesPrivacy as string),
      } as User;

      // Create the user.
      if (!await Handler.database.user.create(query)) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Find the created user.
      const user = await Handler.database.user.findOne({
        username: username as string,
      });

      // Generate a login token.
      const token = generateToken({
        user: user.username,
        date: Date.now(),
      });
      const createdTokens = await Handler.database.token.create({
        user: user.username,
        token,
        created: Date.now(),
      });

      // Session creation failure.
      if (!createdTokens) {
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
      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
