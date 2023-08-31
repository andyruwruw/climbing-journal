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
  UpdateQuery,
  UserSends,
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
        date = null as Date | null,
        start = null as Date | null,
        end = null as Date | null,
        duration = null as Number | null,
        images = null as string[] | null,
        videos = null as string[] | null,
        location = null as string | null,
        state = null as string | null,
        indoors = null as boolean | null,
        max = null as UserSends | null,
        felt = null as Number | null,
        sends = null as UserSends | null,
        notes = null as string | null,
        focuses = null as string[] | null,
      } = req.body;

      // Are the required fields provided?
      if (!id) {
        res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('session', 'id'),
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

      const update = {} as UpdateQuery;

      if (date !== null) {
        update.date = date;
      }
      if (start !== null) {
        update.start = start;
      }
      if (end !== null) {
        update.end = end;
      }
      if (duration !== null) {
        update.duration = duration;
      }
      if (images !== null) {
        update.images = images;
      }
      if (videos !== null) {
        update.videos = videos;
      }
      if (state !== null) {
        update.state = state;
      }
      if (location !== null) {
        update.location = location;
      }
      if (indoors !== null) {
        update.indoors = indoors;
      }
      if (max !== null) {
        update.max = max;
      }
      if (felt !== null) {
        update.felt = felt;
      }
      if (sends !== null) {
        update.sends = sends;
      }
      if (notes !== null) {
        update.notes = notes;
      }
      if (focuses !== null) {
        update.focuses = focuses;
      }

      const existing = await Handler.database.session.findOne({
        _id: id,
        user: user._id as string
      });

      if (!existing) {
        res.status(400).send({
          error: MESSAGE_UNAUTHORIZED,
        });
        return;
      }

      const success = await Handler.database.session.updateOne({
        _id: id,
        user: user._id as string,
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
