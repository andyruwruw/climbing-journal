// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Session,
  Dictionary,
  ErrorResponse,
  User,
  UserSends,
  Media,
  Area,
} from '../types';

/**
 * Deletes an existing session.
 *
 * @param {string} id ID of session.
 * @param {string[]} ids IDs of sessions.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteSession = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/session/delete', {
      params: generateBody({
        id,
        ids: ids ? ids.join(';') : undefined,
      }),
    });

    if (response.status === 200) {
      return null;
    }
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

/**
 * Edits an existing session.
 *
 * @param {string} id ID of the session.
 * @param {string} location Location of session.
 * @param {number} date Date of session.
 * @param {number} start Start time of session.
 * @param {number} end End time of session.
 * @param {number} duration Duration of session.
 * @param {string[]} areas Areas of session.
 * @param {string} state State of session.
 * @param {boolean} bouldering Whether the session involved bouldering.
 * @param {boolean} sport Whether the session involved sport climbing.
 * @param {boolean} trad Whether the session involved trad climbing.
 * @param {boolean} topRope Whether the session involved top rope climbing.
 * @param {boolean} aid Whether the session involved aid climbing.
 * @param {boolean} ice Whether the session involved ice climbing.
 * @param {boolean} mixed Whether the session involved mixed climbing.
 * @param {boolean} alpine Whether the session involved alpine climbing.
 * @param {boolean} outdoor Whether the session was outdoors.
 * @param {number} felt How the session felt.
 * @param {UserSends} max Max grade sent.
 * @param {string} notes Notes of session.
 * @param {string[]} partners Partners of session.
 * @param {Media[]} media Media of session.
 * @returns {Promise<Session | ErrorResponse>} Session edited or an error.
 */
const editSession = async (
  id: string,
  location?: string,
  date?: number,
  start?: number,
  end?: number,
  duration?: number,
  areas?: string[],
  state?: string,
  bouldering?: boolean,
  sport?: boolean,
  trad?: boolean,
  topRope?: boolean,
  aid?: boolean,
  ice?: boolean,
  mixed?: boolean,
  alpine?: boolean,
  outdoor?: boolean,
  felt?: number,
  max?: UserSends,
  notes?: string,
  partners?: string[],
  media?: Media[],
): Promise<Session | ErrorResponse> => {
  try {
    const response = await request.post('/session/edit', generateBody({
      id,
      location,
      date,
      start,
      end,
      duration,
      areas,
      state,
      bouldering,
      sport,
      trad,
      topRope,
      aid,
      ice,
      mixed,
      alpine,
      outdoor,
      felt,
      max,
      notes,
      partners,
      media,
    }));

    if (response.status === 200) {
      return response.data.session as Session;
    }
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

interface GetSessionResponse {
  session: Session;

  location: Location;

  areas: Area[],

  user: User;
}

/**
 * Retrieves a single session.
 *
 * @param {string} id ID of session.
 * @returns {Promise<GetSessionResponse | ErrorResponse>} Session and related objects.
 */
const getSession = async (id: string): Promise<GetSessionResponse | ErrorResponse> => {
  try {
    const response = await request.get('/session/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data as GetSessionResponse;
    }
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

interface GetSessionsResponse {
  sessions: Session[];

  users: Dictionary<User>;

  locations: Dictionary<Location>;

  areas: Dictionary<Area>;
}

/**
 * Retrieves multiple sessions based on filters.
 *
 * @param {string} user User of session.
 * @param {number} date Date of session.
 * @param {string} route Route of session.
 * @param {SessionStatus} status Status of session.
 * @param {number} offset Offset of sessions.
 * @param {number} limit Limit of sessions.
 * @returns {Promise<GetSessionsResponse | ErrorResponse>} Sessions with related tables.
 */
const getSessions = async (
  user?: string,
  location?: string,
  date?: number,
  before?: number,
  after?: number,
  duration?: number,
  area?: string,
  state?: string,
  bouldering?: boolean,
  sport?: boolean,
  trad?: boolean,
  topRope?: boolean,
  aid?: boolean,
  ice?: boolean,
  mixed?: boolean,
  alpine?: boolean,
  outdoor?: boolean,
  felt?: number,
  max?: UserSends,
  notes?: string,
  partners?: string[],
  offset?: number,
  limit?: number,
): Promise<GetSessionsResponse | ErrorResponse> => {
  try {
    const response = await request.get('/session/gets', {
      params: generateBody({
        user,
        location,
        date,
        before,
        after,
        duration,
        area,
        state,
        bouldering,
        sport,
        trad,
        topRope,
        aid,
        ice,
        mixed,
        alpine,
        outdoor,
        felt,
        max,
        notes,
        partners,
        offset,
        limit,
      }),
    });

    if (response.status === 200) {
      return response.data as GetSessionsResponse;
    }
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

/**
 * Creates a new session.
 *
 * @param {string} location Location of session.
 * @param {number} date Date of session.
 * @param {number} start Start time of session.
 * @param {number} end End time of session.
 * @param {number} duration Duration of session.
 * @param {string[]} areas Areas of session.
 * @param {string} state State of session.
 * @param {boolean} bouldering Whether the session involved bouldering.
 * @param {boolean} sport Whether the session involved sport climbing.
 * @param {boolean} trad Whether the session involved trad climbing.
 * @param {boolean} topRope Whether the session involved top rope climbing.
 * @param {boolean} aid Whether the session involved aid climbing.
 * @param {boolean} ice Whether the session involved ice climbing.
 * @param {boolean} mixed Whether the session involved mixed climbing.
 * @param {boolean} alpine Whether the session involved alpine climbing.
 * @param {boolean} outdoor Whether the session was outdoors.
 * @param {number} felt How the session felt.
 * @param {UserSends} max Max grade sent.
 * @param {string} notes Notes of session.
 * @param {string[]} partners Partners of session.
 * @param {Media[]} media Media of session.
 * @returns {Promise<Session | ErrorResponse>} Session created or an error.
 */
const logSession = async (
  location: string,
  date: number,
  start?: number,
  end?: number,
  duration?: number,
  areas?: string[],
  state?: string,
  bouldering?: boolean,
  sport?: boolean,
  trad?: boolean,
  topRope?: boolean,
  aid?: boolean,
  ice?: boolean,
  mixed?: boolean,
  alpine?: boolean,
  outdoor?: boolean,
  felt?: number,
  max?: UserSends,
  notes?: string,
  partners?: string[],
  media?: Media[],
): Promise<Session | ErrorResponse> => {
  try {
    const response = await request.post('/session/log', generateBody({
      location,
      date,
      start,
      end,
      duration,
      areas,
      state,
      bouldering,
      sport,
      trad,
      topRope,
      aid,
      ice,
      mixed,
      alpine,
      outdoor,
      felt,
      max,
      notes,
      partners,
      media,
    }));

    if (response.status === 201) {
      return response.data.session as Session;
    }
    return {
      status: response.status,
      message: response.data.message,
    };
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

export default {
  deleteSession,
  editSession,
  getSession,
  getSessions,
  logSession,
};
