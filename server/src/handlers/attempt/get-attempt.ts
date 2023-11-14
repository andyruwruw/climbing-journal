// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Retrieves an attempt log with relevant data.
 */
export class GetAttemptHandler extends Handler {
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
      const { id } = req.query;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'attempt'),
        });
        return;
      }

      // Find attempt.
      const attempt = await Handler.database.attempt.findOne({
        _id: `${id}`,
      });

      const attemptUser = await Handler.database.user.findOne({
        username: attempt.user,
      });

      // Ensure user has access to view.
      if ((!user || user.username !== attempt.user)
        && attemptUser.attemptPrivacy === 'private'
        && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Retrieve cooresponding data.
      const route = await Handler.database.route.findOne({
        _id: attempt.route,
      });
      const rating = await Handler.database.rating.findOne({
        user: attempt.user,
        route: route._id,
      });

      res.status(200).send({
        attempt,
        rating,
        route,
        user: convertUserToPublic(attemptUser),
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
