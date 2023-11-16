// Local Imports
import request, { generateBody } from './request';

// Types
import {
  ErrorResponse,
  PublicUser,
  PrivacyStatus,
  UserSends,
} from '../types';

/**
 * Checks if user has a current session.
 *
 * @returns {Promise<PublicUser | ErrorResponse>} Promise of action.
 */
export const checkUser = async (): Promise<PublicUser | null | ErrorResponse> => {
  try {
    const response = await request.get('/authentication/check-user');

    if (response.status === 200) {
      return response.data.user as PublicUser | null;
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
 * @returns {Promise<PublicUser | ErrorResponse>} User object or error.
 */
export const login = async (
  username: string,
  password: string,
): Promise<PublicUser | ErrorResponse> => {
  try {
    const response = await request({
      method: 'POST',
      url: '/authentication/login',
      params: {
        username,
        password,
      },
    });

    if (response.status === 201) {
      return response.data.user as PublicUser;
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
 * @param {string} username User's username.
 * @param {string} password User's password.
 * @param {string} displayName User's display name.
 * @param {UserSends} max User's max sends.
 * @param {string} email User's email.
 * @param {string} image User's image.
 * @param {number} started User's started climbing.
 * @param {string} home User's home town.
 * @param {number} height User's height.
 * @param {number} span User's span.
 * @param {number} age User's age.
 * @param {string} privacy User's privacy setting.
 * @param {string} attemptPrivacy User's attempt privacy setting.
 * @param {string} sessionPrivacy User's session privacy setting.
 * @param {string} interestPrivacy User's interest privacy setting.
 * @param {string} reviewPrivacy User's review privacy setting.
 * @param {string} ratingPrivacy User's rating privacy setting.
 * @param {string} shoesPrivacy User's shoes privacy setting.
 * @returns {Promise<PublicUser | ErrorResponse>} User object or error.
 */
export const register = async (
  username: string,
  password: string,
  displayName: string,
  max?: UserSends,
  email?: string,
  image?: string,
  started?: number,
  home?: string,
  height?: number,
  span?: number,
  weight?: number,
  age?: number,
  privacy?: PrivacyStatus,
  attemptPrivacy?: PrivacyStatus,
  sessionPrivacy?: PrivacyStatus,
  interestPrivacy?: PrivacyStatus,
  reviewPrivacy?: PrivacyStatus,
  ratingPrivacy?: PrivacyStatus,
  shoesPrivacy?: PrivacyStatus,
): Promise<PublicUser | ErrorResponse> => {
  try {
    const response = await request({
      method: 'POST',
      url: '/authentication/register',
      params: generateBody({
        username,
        password,
        displayName,
        max,
        email,
        image,
        started,
        home,
        height,
        span,
        weight,
        age,
        privacy,
        attemptPrivacy,
        sessionPrivacy,
        interestPrivacy,
        reviewPrivacy,
        ratingPrivacy,
        shoesPrivacy,
      }),
    });

    if (response.status === 201) {
      return response.data.user as PublicUser;
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
