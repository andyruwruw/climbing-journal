// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Handler } from '../handler';
import { USER_PRIVACY } from '../../config';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Handler for creating a new location.
 */
export class GetUserRatingsHandler extends Handler {
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
      const { id } = req.body;

      // Are the required fields provided?
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('user', 'id'),
        });
        return;
      }

      const user = await validate(
        req,
        Handler.database,
      );

      if (user?._id !== id) {
        const retrievedUser = await Handler.database.user.findById(id);

        if (retrievedUser?.privacy === USER_PRIVACY.PRIVATE) {
          res.status(400).send({
            error: MESSAGE_UNAUTHORIZED,
          });
          return;
        }
      }

      const ratings = await Handler.database.locationRating.find({
        user: id,
      });

      res.status(200).send({
        ratings,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
