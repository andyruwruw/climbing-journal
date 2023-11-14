// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_ITEM_MISSING,
} from '../../config/messages';
import {
  limitString,
  sanitizeAreaType,
} from '../../config';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  QueryConditions,
} from '../../types';

/**
 * Retrieves a set of areas.
 */
export class GetAreasHandler extends Handler {
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
      const {
        ids = '',
        location = '',
        parent = '',
        type = '',
        username = '',
      } = req.query;

      // Prepare find query.
      const query = {} as QueryConditions;
      if ('ids' in req.query) {
        query['_id'] = { $in: `${ids}`.split(',') };
      }
      if ('location' in req.query) {
        query.location = limitString(location, 1000);
      }
      if ('parent' in req.query) {
        query.parent = limitString(parent, 1000);
      }
      if ('type' in req.query) {
        query.type = sanitizeAreaType(type);
      }
      if ('username' in req.query) {
        query.submitted = limitString(username, 1000);
      }

      // Find all areas.
      const areas = await Handler.database.area.find(
        query,
        {},
        {
          name: 1,
        },
      );

      const areaItems = {};

      // Retrieve and store all routes and sub-areas.
      for (let i = 0; i < areas.length; i += 1) {
        areaItems[areas[i]._id] = {
          routes: [],
          areas: [],
        };

        const promises = [
          Handler.database.route.find({
            location: areas[i].location,
            area: areas[i]._id,
          }),
          Handler.database.area.find({
            location: areas[i].location,
            parent: areas[i]._id,
          }),
        ];

        const [
          routes,
          subAreas,
        ] = await Promise.all(promises);

        areaItems[areas[i]._id].routes = routes.map((route) => route._id);
        areaItems[areas[i]._id].areas = subAreas.map((area) => area._id);
      }

      res.status(200).send({
        areas,
        children: areaItems,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}
