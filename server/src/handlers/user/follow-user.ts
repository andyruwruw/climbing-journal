// Local Imports
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';
import { limitString } from '../../config';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Follow,
} from '../../types';

/**
 * Handler for checking if the user is already logged in.
 */
export class FollowUserHandler extends Handler {
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

      // This endpoint requires authentication.
      if (!user) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Retrieve parameters.
      const {
        username,
      } = req.body;

      // Ensure valididty of parameters.
      if (!username) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('username', 'user'),
        });
        return;
      }

      if (username === user.username) {
        res.status(400).send({
          message: 'You cannot follow yourself.',
        });
        return;
      }

      // Retrieve existing entries.
      const promises = [
        Handler.database.user.findOne({
          username: limitString(`${username}`, 100),
        }),
        Handler.database.follow.findOne({
          user: user.username,
          following: limitString(`${username}`, 100),
        }),
      ];

      const [
        existingUser,
        existingFollow,
      ] = await Promise.all(promises);

      // Find and ensure user exists.
      if (!existingUser) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('user', 'username', username),
        });
        return;
      }

      // Ensure user has not already been followed.
      if (existingFollow) {
        res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('follow', 'username', username),
        });
        return;
      }

      // Prepare and sanitize insert query.
      const data = {
        user: user.username,
        following: username,
        updated: Date.now(),
      } as Follow;

      // Insert follow.
      const valid = await Handler.database.follow.create(data);

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      // Retrieve inserted follow.
      const follow = await Handler.database.follow.findOne({
        user: user.username,
        following: username,
      });

      res.status(200).send({
        follow,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}