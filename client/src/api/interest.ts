// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Interest,
  InterestStatus,
  Dictionary,
  ErrorResponse,
  Route,
  User,
} from '../types';

/**
 * Deletes an existing interest.
 *
 * @param {string} id ID of interest.
 * @param {string[]} ids IDs of interests.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteInterest = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/interest/delete', {
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
 * Edits an existing interest.
 *
 * @param {string} id ID of the interest.
 * @param {number} date Date of interest.
 * @param {string} route Route of interest.
 * @param {InterestStatus} status Status of interest.
 * @param {string} notes Notes of interest.
 * @returns {Promise<Interest | ErrorResponse>} Interest edited or an error.
 */
const editInterest = async (
  id: string,
  date?: number,
  route?: string,
  status?: InterestStatus,
  notes?: string,
): Promise<Interest | ErrorResponse> => {
  try {
    const response = await request.post('/interest/edit', generateBody({
      id,
      date,
      route,
      status,
      notes,
    }));

    if (response.status === 200) {
      return response.data.interest as Interest;
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

interface GetInterestResponse {
  interest: Interest;

  route: Route;

  user: User;
}

/**
 * Retrieves a single interest.
 *
 * @param {string} id ID of interest.
 * @returns {Promise<GetInterestResponse | ErrorResponse>} Interest and related objects.
 */
const getInterest = async (id: string): Promise<GetInterestResponse | ErrorResponse> => {
  try {
    const response = await request.get('/interest/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data as GetInterestResponse;
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

interface GetInterestsResponse {
  interests: Interest[];

  routes: Dictionary<Route>;

  users: Dictionary<User>;
}

/**
 * Retrieves multiple interests based on filters.
 *
 * @param {string} user User of interest.
 * @param {number} date Date of interest.
 * @param {string} route Route of interest.
 * @param {InterestStatus} status Status of interest.
 * @param {number} offset Offset of interests.
 * @param {number} limit Limit of interests.
 * @returns {Promise<GetInterestsResponse | ErrorResponse>} Interests with related tables.
 */
const getInterests = async (
  user?: string,
  date?: number,
  route?: string,
  status?: InterestStatus,
  offset?: number,
  limit?: number,
): Promise<GetInterestsResponse | ErrorResponse> => {
  try {
    const response = await request.get('/interest/gets', {
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
      return response.data as GetInterestsResponse;
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
 * Creates a new interest.
 *
 * @param {string} route Route of interest.
 * @param {InterestStatus} status Status of interest.
 * @param {string} notes Notes of interest.
 * @returns {Promise<Interest | ErrorResponse>} Interest created or an error.
 */
const logInterest = async (
  route: string,
  status: InterestStatus,
  notes?: string,
): Promise<Interest | ErrorResponse> => {
  try {
    const response = await request.post('/interest/log', generateBody({
      route,
      status,
      notes,
    }));

    if (response.status === 201) {
      return response.data.interest as Interest;
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
  deleteInterest,
  editInterest,
  getInterest,
  getInterests,
  logInterest,
};
