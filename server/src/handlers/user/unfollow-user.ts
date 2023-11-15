// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR, MESSAGE_ITEM_MISSING, MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { limitString } from '../../config';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Unfollows a user.
 */
export class UnfollowUserHandler extends Handler {
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
      } = req.query;

      // Ensure valididty of parameters.
      if (!username) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('username', 'user'),
        });
        return;
      }

      // Retrieve existing entries.
      const existing = await Handler.database.follow.findOne({
        user: user.username,
        following: limitString(`${username}`, 100),
      });

      // Find and ensure follow exists.
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('follow', 'username', username),
        });
        return;
      }

      // Delete follow.
      const valid = await Handler.database.follow.delete({
        user: user.username,
        following: limitString(`${username}`, 100),
      });

      if (valid === 0) {
        res.status(500).send({
          message: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      res.status(200).send({
        message: 'Successfully unfollowed user.',
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}