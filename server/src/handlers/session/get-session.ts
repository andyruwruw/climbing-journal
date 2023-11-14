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
 * Retrieves a session.
 */
export class GetSessionHandler extends Handler {
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
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'session'),
        });
        return;
      }

      // Find session.
      const session = await Handler.database.session.findOne({
        _id: `${id}`,
      });

      const sessionUser = await Handler.database.user.findOne({
        username: session.user,
      });

      // Ensure user has access to view.
      if ((!user || user.username !== session.user)
        && sessionUser.sessionPrivacy === 'private'
        && !user.admin) {
        res.status(401).send({
          message: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      // Retrieve cooresponding data.
      const location = await Handler.database.location.findOne({
        _id: session.location,
      });
      const areas = await Handler.database.area.find({
        _id: {
          $in: session.areas,
        },
      });

      res.status(200).send({
        session,
        location,
        areas,
        user: convertUserToPublic(sessionUser),
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}