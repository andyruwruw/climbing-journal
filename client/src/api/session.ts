// Local Imports
import request from './request';

// Types
import { ErrorResponse, Session } from '../types';

/**
 * Checks if user has a current session.
 *
 * @param {string} id Id of the user.
 * @returns {Promise<User | ErrorResponse>} Promise of action.
 */
export const getUserSessions = async (id: string): Promise<Session[] | ErrorResponse> => {
  try {
    const response = await request.get(`/sessions/get-user-sessions?id=${id}`);

    if (response.status === 200) {
      return response.data.sessions;
    }
    return {
      status: response.status,
      message: response.data.error,
    };
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

export default {
  getUserSessions,
};
