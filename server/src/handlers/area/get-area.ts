// Local Imports
import {
  MESSAGE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
} from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Retrieves an area's details.
 */
export class GetAreaHandler extends Handler {
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
      // Retrieve parameters.
      const { id } = req.body;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'area'),
        });
        return;
      }

      // Prepare find query.
      const query = { _id: `${id}` };

      // Find and ensure area exists.
      const existing = await Handler.database.area.findOne(query);
      if (!existing) {
        res.status(400).send({
          message: MESSAGE_ITEM_MISSING('area', 'id', id),
        });
        return;
      }

      const promises = [
        Handler.database.area.find({ parent: `${id}` }),
        Handler.database.route.find({ area: `${id}` }),
      ];

      const [
        subAreas,
        routes,
      ] = await Promise.all(promises);

      res.status(200).send({
        area: existing,
        children: {
          areas: subAreas,
          routes,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
