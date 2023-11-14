// Local Imports
import {
  generateEmptyMaxSends,
  limitString,
  sanitizeDate,
  sanitizeMaxSends,
  sanitizeNumber,
  sanitizePrivacy,
  sanitizeUserHref,
} from '../../config';
import {
  MESSAGE_CREATE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  convertUserToPublic,
  hashPassword,
  validate,
} from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  DatabaseColumnTypes,
  Dictionary,
} from '../../types';

/**
 * Edits a user's information.
 */
export class EditUserHandler extends Handler {
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

      // Retrieve parameters.
      const {
        id,
        username = '',
        password = '',
        displayName = '',
        max = generateEmptyMaxSends(),
        email = '',
        image = '',
        href = {},
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
      if (!id) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('user', 'id'),
        });
        return;
      }

      // Find and ensure user exists.
      const existing = await Handler.database.user.findOne({ _id: `${id}` });
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('user', 'id', id),
        });
        return;
      }

      // Does the user have permission to do this action?
      if (existing.username !== user.username && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Prepare and sanitize update query.
      const update = {} as Dictionary<DatabaseColumnTypes>;
      if ('username' in req.body) {
        update.username = limitString(username as string, 100);
      }
      if ('password' in req.body) {
        update.password = await hashPassword(password as string);
      }
      if ('displayName' in req.body) {
        update.displayName = limitString(displayName as string, 100);
      }
      if ('max' in req.body) {
        update.max = sanitizeMaxSends(max);
      }
      if ('href' in req.body) {
        update.href = sanitizeUserHref(href);
      }
      if ('email' in req.body) {
        update.email = limitString(email as string, 500);
      }
      if ('image' in req.body) {
        update.image = limitString(image);
      }
      if ('started' in req.body) {
        update.started = sanitizeDate(started);
      }
      if ('home' in req.body) {
        update.home = limitString(home);
      }
      if ('height' in req.body) {
        update.height = sanitizeNumber(height, false, 500, -1, 0);
      }
      if ('span' in req.body) {
        update.span = sanitizeNumber(span, false, 500, -1, 0);
      }
      if ('weight' in req.body) {
        update.weight = sanitizeNumber(weight, false, NaN, 0, 0);
      }
      if ('age' in req.body) {
        update.age = sanitizeNumber(age, false, NaN, 0, 0);
      }
      if ('privacy' in req.body) {
        update.privacy = sanitizePrivacy(privacy);
      }
      if ('attemptPrivacy' in req.body) {
        update.attemptPrivacy = sanitizePrivacy(attemptPrivacy);
      }
      if ('sessionPrivacy' in req.body) {
        update.sessionPrivacy = sanitizePrivacy(sessionPrivacy);
      }
      if ('interestPrivacy' in req.body) {
        update.interestPrivacy = sanitizePrivacy(interestPrivacy);
      }
      if ('reviewPrivacy' in req.body) {
        update.reviewPrivacy = sanitizePrivacy(reviewPrivacy);
      }
      if ('ratingPrivacy' in req.body) {
        update.ratingPrivacy = sanitizePrivacy(ratingPrivacy);
      }
      if ('shoesPrivacy' in req.body) {
        update.shoesPrivacy = sanitizePrivacy(shoesPrivacy);
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Update attempt.
      if (Object.keys(update).length !== 0) {
        update.updated = Date.now();

        await Handler.database.user.update(
          query,
          update,
        );
      }

      // Retrieve updated user.
      const newUser = await Handler.database.user.findOne(query);

      res.status(200).send({
        user: convertUserToPublic(newUser),
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}