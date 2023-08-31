// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { validate } from '../../helpers/authentication';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';
import { generateEmptyMaxSends } from '../../config';

/**
 * Handler for creating a new session.
 */
export class CreateSessionHandler extends Handler {
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
      const {
        date,
        start,
        end,
        duration = 0,
        images = [],
        videos = [],
        location = '',
        state = '',
        indoors = false,
        max = generateEmptyMaxSends(),
        felt = 0,
        sends = generateEmptyMaxSends(),
        notes = '',
        focuses = [],
      } = req.body;

      // Are the required fields provided?
      if (!date) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'date'),
        });
        return;
      }
      if (!start) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'start'),
        });
        return;
      }
      if (!end) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'end'),
        });
        return;
      }

      const user = await validate(
        req,
        Handler.database,
      );

      if (!user) {
        res.status(400).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      let existing = await Handler.database.location.findOne({
        name: location,
      });

      if (!existing) {
        existing = await Handler.database.location.create(
          location,
        );
      }

      const session = await Handler.database.session.create(
        user._id,
        start,
        end,
        date,
        duration,
        existing._id,
        images,
        videos,
        state,
        indoors,
        max,
        felt,
        sends,
        notes,
        focuses,
      );

      if (!session) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      res.status(200).send({
        session,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
