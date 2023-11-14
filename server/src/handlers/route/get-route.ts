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
 * Retrieves a route.
 */
export class GetRoutesHandler extends Handler {
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
      const { id } = req.query;

      // Ensure valididty of parameters.
      if (!id) {
        res.status(400).send({
          message: MESSAGE_HANDLER_PARAMETER_MISSING('id', 'route'),
        });
        return;
      }

      // Find route.
      const route = await Handler.database.route.findOne({
        _id: `${id}`,
      });

      // Retreive related data.
      const promises = [
        Handler.database.location.findOne({
          _id: route.location,
        }),
        (route.area ? Handler.database.area.findOne({
          _id: route.area,
        }) : null),
      ];

      const [
        location,
        area,
      ] = await Promise.all(promises);

      res.status(200).send({
        route,
        location,
        area,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}