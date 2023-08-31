// Local Imports
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
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
import { Location } from '../../types';
import { USER_PRIVACY } from '@/config';

/**
 * Handler for creating a new location.
 */
export class CreateLocationHandler extends Handler {
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

      const sessions = await Handler.database.session.find({
        user: id,
      });

      const unique: string[] = [];
      const hours: Record<string, number> = {};

      for (let i = 0; i < sessions.length; i += 1) {
        if (!unique.includes(sessions[i].location as string)) {
          unique.push(sessions[i].location as string);

          hours[sessions[i].location as string] = sessions[i].duration;
        } else {
          hours[sessions[i].location as string] += sessions[i].duration;
        }
      }

      const retrievals = [];

      for (let i = 0; i < unique.length; i += 1) {
        retrievals.push(Handler.database.location.findById(unique[i]));
      }

      const results = await Promise.all(retrievals);

      for (let i = 0; i < results.length; i += 1) {
        const id = (results[i] as unknown as Location)._id;

        if (results[i] != null && id != null) {
          (results[i] as unknown as Location).hours = hours[id];
        }
      }

      res.status(200).send({
        results,
      });
    } catch (error) {
      console.log(error);

      res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
