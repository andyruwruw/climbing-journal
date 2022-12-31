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
} from '../../types';

/**
 * Handler for retrieving a locations ratings.
 */
export class GetLocationRatingsHandler extends Handler {
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
        return res.status(400).send({
          error: MESSAGE_HANDLER_PARAMETER_MISSING('location', 'id'),
        });
      }

      const ratings = await Handler.database.locationRating.find({
        location: id,
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
