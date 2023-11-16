// Local Imports
import {
  limitString,
  sanitizeBoolean,
  sanitizeCursorLimit,
  sanitizeCursorOffset,
  sanitizeDate,
} from '../../config';
import {
  convertUserToPublic,
  validate,
} from '../../helpers/authentication';
import { MESSAGE_INTERNAL_SERVER_ERROR } from '../../config/messages';
import { Handler } from '../handler';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
  Dictionary,
  QueryConditions,
  Session,
} from '../../types';

/**
 * Retrieves a set of sessions.
 */
export class GetSessionsHandler extends Handler {
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
        user: username,
        location = '',
        date = 0,
        before = 0,
        after = 0,
        duration = 0,
        area = '',
        state = '##',
        bouldering = 'false',
        sport = 'false',
        trad = 'false',
        topRope = 'false',
        aid = 'false',
        ice = 'false',
        mixed = 'false',
        alpine = 'false',
        outdoor = 'false',
        felt = 0,
        max = {},
        partner = '',
        offset = '0',
        limit = '50',
      } = req.query;

      // Prepare find query.
      const query = {} as QueryConditions;
      if ('location' in req.query) {
        query.location = limitString(location, 100);
      }
      if ('user' in req.query) {
        query.user = limitString(username, 100);
      }
      if (date !== "-1" || before !== "-1" || after !== "-1") {
        query.date = {};

        if (before !== "-1" || after !== "-1") {
          if (before !== "-1") {
            query.date.$lt = sanitizeDate(before);
          }
          if (after !== "-1") {
            query.date.$gt = sanitizeDate(after);
          }
        } else {
          query.date = sanitizeDate(date);
        }
      }
      if ('duration' in req.query) {
        query.duration = {
          $gte: sanitizeDate(duration),
        };
      }
      if ('state' in req.query) {
        query.state = limitString(state, 2);
      }
      if ('bouldering' in req.query) {
        query.bouldering = sanitizeBoolean(bouldering);
      }
      if ('sport' in req.query) {
        query.sport = sanitizeBoolean(sport);
      }
      if ('trad' in req.query) {
        query.trad = sanitizeBoolean(trad);
      }
      if ('topRope' in req.query) {
        query.topRope = sanitizeBoolean(topRope);
      }
      if ('aid' in req.query) {
        query.aid = sanitizeBoolean(aid);
      }
      if ('ice' in req.query) {
        query.ice = sanitizeBoolean(ice);
      }
      if ('mixed' in req.query) {
        query.mixed = sanitizeBoolean(mixed);
      }
      if ('alpine' in req.query) {
        query.alpine = sanitizeBoolean(alpine);
      }
      if ('outdoor' in req.query) {
        query.outdoor = sanitizeBoolean(outdoor);
      }
      if ('felt' in req.query) {
        query.felt = {
          $gte: sanitizeDate(felt),
        };
      }
      if ('max' in req.query) {
        const keys = Object.keys(max) || [];

        for (let i = 0; i < keys.length; i += 1) {
          const key = keys[i];
          const value = max[key];

          if (value) {
            query[`max.${key}`] = {
              $gte: value,
            };
          }
        }
      }

      // Find all sessions.
      const sessions = await Handler.database.session.find(
        query,
        {},
        {
          date: 1,
        },
        sanitizeCursorOffset(offset),
        sanitizeCursorLimit(limit),
      );

      // Prepare user table.
      const userSessions = {} as Dictionary<Session[]>;

      // For every session, find the user.
      for (let i = 0; i < sessions.length; i += 1) {
        const session = sessions[i];
        const { user: sessionUser } = session;

        // Log session under user.
        if (!(sessionUser in userSessions)) {
          userSessions[sessionUser] = [session];
        } else {
          userSessions[sessionUser].push(session);
        }
      }

      // Resolve all users.
      const users = await Handler.database.user.find({
        username: {
          $in: Object.keys(userSessions),
        },
      });

      const approvedSessions = [];
      const userReferenceTable = {};

      // Check if each session is allowed.
      for (let i = 0; i < users.length; i += 1) {
        const resolvedUser = users[i];

        if (!resolvedUser) {
          continue;
        }

        const { username } = resolvedUser;

        // If approved
        if ((user && user.admin)
          || resolvedUser.sessionPrivacy !== 'private'
          || (user && user.username === username)) {
          // Filter out area specific
          const sessions = [];

          for (let j = 0; j < userSessions[username].length; j += 1) {
            const session = userSessions[username][j];

            let approved = true;

            if ('area' in req.query) {
              approved = session.areas.includes(`${area}`);
            }
            if ('partner' in req.query) {
              approved = session.partners.includes(`${partner}`);
            }

            if (approved) {
              sessions.push(session);
            }
          }

          approvedSessions.push(...sessions);
          userReferenceTable[username] = convertUserToPublic(resolvedUser);
        }
      }

      const locations = await Handler.database.location.find({
        _id: {
          $in: approvedSessions.map((session) => session.location),
        },
      });
      const areas = await Handler.database.area.find({
        _id: {
          $in: Object.keys(approvedSessions.reduce((acc, session) => {
            acc[session.area] = true;
          }, {})),
        },
      });

      // Reduce all linking tables.
      res.status(200).send({
        sessions: approvedSessions,
        users: userReferenceTable,
        locations: locations.reduce((acc, location) => ({
          ...acc,
          [location._id]: location,
        }), {}),
        areas: areas.reduce((acc, area) => ({
          ...acc,
          [area._id]: area,
        }), {}),
      });
    } catch (error) {
      res.status(500).send({
        message: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}