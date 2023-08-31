// Local Imports
import request from './request';

// Types
import {
  User,
  ErrorResponse,
  UserPrivacy,
} from '../types';

/**
 * Checks if user has a current session.
 *
 * @returns {Promise<User | ErrorResponse>} Promise of action.
 */
export const checkUser = async (): Promise<User | ErrorResponse> => {
  try {
    const response = await request.get('/authentication/check-user');

    if (response.status === 200) {
      return response.data.user;
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

/**
 * Creates a new login session.
 *
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @returns {Promise<User | ErrorResponse>} User object or error.
 */
export const login = async (
  username: string,
  password: string,
): Promise<User | ErrorResponse> => {
  try {
    console.log(username, password);
    const response = await request({
      method: 'PUT',
      url: '/authentication/login',
      params: {
        username,
        password,
      },
    });

    if (response.status === 201) {
      return response.data.user;
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

/**
 * Removes user's current login session.
 */
export const logout = async (): Promise<void | ErrorResponse> => {
  try {
    return await request.delete('/authentication/logout');
  } catch (error) {
    return {
      status: 400,
      message: `${error}`,
    };
  }
};

/**
 * Creates a new user.
 *
 * @param {string} name User's name.
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {number} [started = -1,] When the user started climbing.
 * @param {number} [height = -1,] The user's height.
 * @param {number} [span = 100,] The user's span to height difference.
 * @param {number} [weight = -1,] The user's weight.
 * @param {string} [image = '',] The user's profile image.
 * @param {UserPrivacy} [privacy = 'unlisted',] Privacy setttings.
 * @returns {Promise<User | ErrorResponse>} User object or error.
 */
export const register = async (
  name: string,
  username: string,
  password: string,
  started = -1,
  height = -1,
  span = 100,
  weight = -1,
  image = '',
  privacy = 'unlisted' as UserPrivacy,
): Promise<User | ErrorResponse> => {
  try {
    const response = await request({
      method: 'POST',
      url: '/authentication/register',
      params: {
        name,
        username,
        password,
        started,
        height,
        span,
        weight,
        image,
        privacy,
      },
    });

    if (response.status === 201) {
      return response.data.user;
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
  checkUser,
  login,
  logout,
  register,
};
