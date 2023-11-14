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
 * Retrieves a route interest.
 */
export class GetInterestHandler extends Handler {
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
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'interest'),
        });
        return;
      }

      // Find interest.
      const interest = await Handler.database.interest.findOne({
        _id: `${id}`,
      });

      // Find cooresponding user.
      const interestUser = await Handler.database.user.findOne({
        username: interest.user,
      });

      // Ensure user has access to view.
      if ((!user || user.username !== interest.user)
        && interestUser.interestPrivacy === 'private'
        && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Find cooresponding route.
      const route = await Handler.database.route.findOne({
        _id: interest.route,
      });

      res.status(200).send({
        interest,
        route,
        user: convertUserToPublic(interestUser),
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
