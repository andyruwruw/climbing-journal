// Local Imports
import {
  MESSAGE_INTERNAL_SERVER_ERROR,
  MESSAGE_UNAUTHORIZED,
} from '../../config/messages';
import { Handler } from '../handler';
import { validate } from '../../helpers/authentication';
import { sanitizeBoolean } from '../../config';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Dictionary,
  QueryConditions,
} from '../../types';

/**
 * Retrieve multiple locations.
 */
export class GetLocationsHandler extends Handler {
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
      const {
        ids = [],
        state = '##',
        outdoors = 'true',
        userSpecific = 'false',
      } = req.query;

      let determinedIds = ids;

      if ('userSpecific' in req.query && sanitizeBoolean(userSpecific)) {
        // Ensure user is logged in.
        if (!user) {
          res.status(401).send({
            message: MESSAGE_UNAUTHORIZED,
          });
          return;
        }

        // Find user sessions.
        const sessions = await Handler.database.session.find({
          user: user._id,
        });

        // Gather all user locations.
        const locations = {} as Dictionary<boolean>;

        for (let i = 0; i < sessions.length; i += 1) {
          if (!(sessions[i].location in locations)) {
            locations[sessions[i].location] = true;
          }
        }

        determinedIds = Object.keys(locations);
      }

      // Prepare find query.
      const query = {} as QueryConditions;
      if (determinedIds.length) {
        query._id = { $in: determinedIds };
      }
      if ('state' in req.query) {
        query.state = state;
      }
      if ('outdoors' in req.query) {
        query.outdoors = sanitizeBoolean(outdoors);
      }

      // Find locations.
      const locations = await Handler.database.location.find(query);

      res.status(200).send({
        locations,
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}