// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Follow,
  User,
} from '../../types';
import { convertUserToPublic } from '../../helpers/authentication';

/**
 * Handler for retrieving a user's followings.
 */
export class GetUserFollowingsHandler extends Handler {
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
      const { id } = req.query;

      // Are the required fields provided?
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'id'),
        });
        return;
      }

      const followings = await Handler.database.follow.find({
        user: id as string,
      });

      const users = await Promise.all(
        followings.map(async (follow: Follow): Promise<User> => {
          const user = await Handler.database.user.findById(
            follow.following as string,
          );

          return convertUserToPublic(user) as User;
        }),
      );

      res.status(200).send({
        following: users,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
