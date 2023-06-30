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
  MaxSends,
  UpdateQuery,
} from '../../types';

/**
 * Handler for editing an existing session.
 */
export class EditSessionHandler extends Handler {
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
        id,
        start = null as Date | null,
        location = null as string | null,
        duration = null as number | null,
        ability = null as number | null,
        felt = null as number | null,
        focus = null as string[] | null,
        max = null as MaxSends | null,
        images = null as string[] | null,
        notes = null as string | null,
      } = req.body;

      // Are the required fields provided?
      if (!id) {
        return res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'id'),
        });
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

      const update = {} as UpdateQuery;

      if (start !== null) {
        update.start = start;
      }
      if (location !== null) {
        update.location = location;
      }
      if (duration !== null) {
        update.duration = duration;
      }
      if (ability !== null) {
        update.ability = ability;
      }
      if (felt !== null) {
        update.felt = felt;
      }
      if (focus !== null) {
        update.focus = focus;
      }
      if (images !== null) {
        update.images = images;
      }
      if (max !== null) {
        update.max = max;
      }
      if (notes !== null) {
        update.notes = notes;
      }

      const success = await Handler.database.session.updateOne({
        _id: id,
        user: user._id,
      }, update);

      if (!success) {
        res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
        return;
      }

      const session = await Handler.database.session.findById(id);

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
