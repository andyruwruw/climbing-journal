// Local Imports
import request from './request';

// Types
import {
  MaxSends,
  Session,
  SessionFocus,
} from '../types';

/**
 * Creates a new session.
 *
 * @returns {Promise<Session | null>} Session if created, null otherwise.
 */
const create = async (
  start: Date,
  location = 'Unknown',
  duration = 0,
  ability = 5,
  felt = 5,
  focus = [] as SessionFocus[],
  max = undefined as MaxSends | undefined,
  images = [] as string[],
  notes = '',
): Promise<Session | null> => {
  try {
    const response = await request.post(
      '/session/create',
      {
        start,
        location,
        duration,
        ability,
        felt,
        focus,
        max,
        images,
        notes,
      },
    );

    if (response.status === 200) {
      return response.data.session;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Deletes an existing session.
 *
 * @returns {Promise<null>} Promise of the action.
 */
const deleteSession = async (id: string): Promise<null> => {
  try {
    await request.delete(`/session/delete?id=${id}`);
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Edits an existing session.
 *
 * @returns {Promise<Session | null>} Session if edited, null otherwise.
 */
const edit = async (
  id: string,
  start: Date = new Date(0),
  location = 'Unknown',
  duration = 0,
  ability = 5,
  felt = 5,
  focus = [] as SessionFocus[],
  max = undefined as MaxSends | undefined,
  images = [] as string[],
  notes = '',
): Promise<Session | null> => {
  try {
    const response = await request.post(
      '/session/edit',
      {
        id,
        start,
        location,
        duration,
        ability,
        felt,
        focus,
        max,
        images,
        notes,
      },
    );

    if (response.status === 200) {
      return response.data.session;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves sessions for a user.
 *
 * @returns {Promise<Session[]>} Promise of the action.
 */
const getUserSessions = async (id: string): Promise<Session[]> => {
  try {
    const response = await request.get(`/session/get-user-sessions?id=${id}`);

    if (response.status === 200) {
      return response.data.sessions;
    }
    return [] as Session[];
  } catch (error) {
    return [] as Session[];
  }
};

export default {
  create,
  delete: deleteSession,
  edit,
  getUserSessions,
};
