// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';
import { overrideAdminQuery } from '../../config';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Deletes a session.
 */
export class DeleteSessionHandler extends Handler {
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
        id,
        ids,
      } = req.query;

      // Ensure valididty of parameters.
      if (!id && !ids) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'session'),
        });
        return;
      }

      // Delete by ID.
      if (id) {
        await Handler.database.session.delete(overrideAdminQuery({
          _id: `${id}`,
        }, user));
      }

      // Delete many by Id.
      if (ids) {
        const convertedIds = (`${ids}`).split(';');

        await Handler.database.session.delete(overrideAdminQuery({
          _id: {
            $in: convertedIds,
          },
        }, user));
      }

      res.status(200).send({
        message: 'Successfully deleted session.',
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}