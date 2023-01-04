// Local Imports
import request from './request';

// Types
import { User } from '../types';

/**
 * Checks if the user is logged in.
 *
 * @returns {Promise<User | null>} User if logged in, null otherwise.
 */
const checkUser = async (): Promise<User | null> => {
  try {
    const response = await request.get('/authentication/check-user');

    if (response.status === 200) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Logs a user in.
 *
 * @returns {Promise<User | null>} User if logged in, null otherwise.
 */
 const login = async (
  username: string,
  password: string,
 ): Promise<User | null> => {
  try {
    const response = await request.post(
      '/authentication/login',
      {
        username,
        password,
      },
    );

    if (response.status === 200) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Logs a user out.
 *
 * @returns {Promise<null>} Promise of action.
 */
const logout = async (): Promise<User | null> => {
  try {
    await request.get('/authentication/logout');
    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Registers a new user.
 *
 * @returns {Promise<User | null>} User if logged in, null otherwise.
 */
 const register = async (
  name: string,
  username: string,
  password: string,
  started = -1,
  height = -1,
  span = 100,
  weight = -1,
  image = ''
 ): Promise<User | null> => {
  try {
    const response = await request.post(
      '/authentication/register',
      {
        name,
        username,
        password,
        started,
        height,
        span,
        weight,
        image,
      },
    );

    if (response.status === 200) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    return null;
  }
}

export default {
  checkUser,
  login,
  logout,
  register,
};
