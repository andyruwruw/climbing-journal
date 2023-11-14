// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Goodbye User.
 */
export class DeleteUserHandler extends Handler {
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
      const { username } = req.query;

      // Requires admin authentication to delete others.
      if (!user.admin && username !== user.username) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const promises = [];

      // Delete query.
      const query = { user: user.username };

      // Do it.
      promises.push(Handler.database.attempt.delete(query));
      promises.push(Handler.database.follow.delete(query));
      promises.push(Handler.database.interest.delete(query));
      promises.push(Handler.database.medal.delete(query));
      promises.push(Handler.database.post.delete(query));
      promises.push(Handler.database.rating.delete(query));
      promises.push(Handler.database.review.delete(query));
      promises.push(Handler.database.session.delete(query));
      promises.push(Handler.database.shoes.delete(query));
      promises.push(Handler.database.token.delete(query));

      await Promise.all(promises);

      // Final goodbye.
      await Handler.database.user.delete({
        username,
      });

      res.status(200).send({
        message: 'Successfully deleted user.',
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}