// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Attempt,
  AttemptStatus,
  Dictionary,
  ErrorResponse,
  Media,
  Rating,
  Route,
  User,
} from '../types';

/**
 * Deletes an existing attempt.
 *
 * @param {string} id ID of attempt.
 * @param {string[]} ids IDs of attempts.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteAttempt = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/attempt/delete', {
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
 * Edits an existing attempt.
 *
 * @param {string} id ID of the attempt.
 * @param {number} date Date of attempt.
 * @param {string} route Route of attempt.
 * @param {string} status Status of attempt.
 * @param {string} notes Notes of attempt.
 * @param {Media[]} media Media of attempt.
 * @returns {Promise<Attempt | ErrorResponse>} Attempt edited or an error.
 */
const editAttempt = async (
  id: string,
  date?: number,
  route?: string,
  status?: string,
  notes?: string,
  media?: Media[],
): Promise<Attempt | ErrorResponse> => {
  try {
    const response = await request.post('/attempt/edit', generateBody({
      id,
      date,
      route,
      status,
      notes,
      media,
    }));

    if (response.status === 200) {
      return response.data.attempt as Attempt;
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

interface GetAttemptResponse {
  attempt: Attempt;

  rating: Rating;

  route: Route;

  user: User;
}

/**
 * Retrieves a single attempt.
 *
 * @param {string} id ID of attempt.
 * @returns {Promise<GetAttemptResponse | ErrorResponse>} Attempt and related objects.
 */
const getAttempt = async (id: string): Promise<GetAttemptResponse | ErrorResponse> => {
  try {
    const response = await request.get('/attempt/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data as GetAttemptResponse;
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

interface GetAttemptsResponse {
  attempts: Attempt[];

  ratings: Dictionary<Dictionary<Rating>>;

  routes: Dictionary<Route>;

  users: Dictionary<User>;
}

/**
 * Retrieves multiple attempts based on filters.
 *
 * @param {string} user User of attempt.
 * @param {number} date Date of attempt.
 * @param {string} route Route of attempt.
 * @param {AttemptStatus} status Status of attempt.
 * @param {number} offset Offset of attempts.
 * @param {number} limit Limit of attempts.
 * @returns {Promise<GetAttemptsResponse | ErrorResponse>} Attempts with related tables.
 */
const getAttempts = async (
  user?: string,
  date?: number,
  route?: string,
  status?: AttemptStatus,
  offset?: number,
  limit?: number,
): Promise<GetAttemptsResponse | ErrorResponse> => {
  try {
    const response = await request.get('/attempt/gets', {
      params: generateBody({
        user,
        date,
        route,
        status,
        offset,
        limit,
      }),
    });

    if (response.status === 200) {
      return response.data as GetAttemptsResponse;
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
 * Creates a new attempt.
 *
 * @param {number} date Date of attempt.
 * @param {string} route Route of attempt.
 * @param {AttemptStatus} status Status of attempt.
 * @param {string} notes Notes of attempt.
 * @param {Media[]} media Media of attempt.
 * @returns {Promise<Attempt | ErrorResponse>} Attempt created or an error.
 */
const logAttempt = async (
  date: number,
  route: string,
  status: AttemptStatus,
  notes?: string,
  media?: Media[],
): Promise<Attempt | ErrorResponse> => {
  try {
    const response = await request.post('/attempt/log', generateBody({
      date,
      route,
      status,
      notes,
      media,
    }));

    if (response.status === 201) {
      return response.data.attempt as Attempt;
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
  deleteAttempt,
  editAttempt,
  getAttempt,
  getAttempts,
  logAttempt,
};
