// Local Imports
import request, { generateBody } from './request';

// Types
import {
  ErrorResponse,
  UserSends,
  ExternalHref,
  PrivacyStatus,
  PublicUser,
  Follow,
  Medal,
} from '../types';

/**
 * Deletes an existing user.
 *
 * @param {string} username Username of the user.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteUser = async (username: string): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/user/delete', {
      params: { username },
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
 * Follows a user.
 *
 * @param {string} username Username of the user.
 * @returns {Promise<Follow | ErrorResponse>} Follow if successful, or error.
 */
const followUser = async (username: string): Promise<Follow | ErrorResponse> => {
  try {
    const response = await request.post('/user/follow', { username });

    if (response.status === 201) {
      return response.data.follow as Follow;
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
 * Unfollows a user.
 *
 * @param {string} username Username of the user.
 * @returns {Promise<Follow | ErrorResponse>} Unfollow if successful, or error.
 */
const unfollowUser = async (username: string): Promise<Follow | ErrorResponse> => {
  try {
    const response = await request.delete('/user/unfollow', {
      params: { username },
    });

    if (response.status === 200) {
      return response.data.follow as Follow;
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
 * Edits an existing user.
 *
 * @param {string} id ID of the user.
 * @param {string} username Username of the user.
 * @param {string} password Password of the user.
 * @param {string} displayName Display name of the user.
 * @param {UserSends} max Max sends of the user.
 * @param {string} email Email of the user.
 * @param {string} image Image of the user.
 * @param {ExternalHref} href External href of the user.
 * @param {number} started When the user started climbing.
 * @param {string} home Home of the user.
 * @param {number} height Height of the user.
 * @param {number} span Span of the user.
 * @param {number} weight Weight of the user.
 * @param {number} age Age of the user.
 * @param {PrivacyStatus} privacy Privacy of the user.
 * @param {PrivacyStatus} attemptPrivacy Attempt privacy of the user.
 * @param {PrivacyStatus} sessionPrivacy Session privacy of the user.
 * @param {PrivacyStatus} interestPrivacy Interest privacy of the user.
 * @param {PrivacyStatus} reviewPrivacy Review privacy of the user.
 * @param {PrivacyStatus} ratingPrivacy Rating privacy of the user.
 * @param {PrivacyStatus} shoesPrivacy Shoes privacy of the user.
 * @returns {Promise<PublicUser | ErrorResponse>} User edited or an error.
 */
const editUser = async (
  id: string,
  username?: string,
  password?: string,
  displayName?: string,
  max?: UserSends,
  email?: string,
  image?: string,
  href?: ExternalHref,
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
    const response = await request.post('/user/edit', generateBody({
      id,
      username,
      password,
      displayName,
      max,
      email,
      image,
      href,
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
    }));

    if (response.status === 200) {
      return response.data.user as PublicUser;
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
 * Retrieves a single user.
 *
 * @param {string} username Username of user.
 * @returns {Promise<PublicUser | ErrorResponse>} User object.
 */
const getUser = async (username: string): Promise<PublicUser | ErrorResponse> => {
  try {
    const response = await request.get('/user/get', {
      params: { username },
    });

    if (response.status === 200) {
      return response.data.user as PublicUser;
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
 * Retrieves a single user's medals.
 *
 * @param {string} username Username of user.
 * @returns {Promise<PublicUser | ErrorResponse>} User object.
 */
const getUserMedals = async (username: string): Promise<Medal[] | ErrorResponse> => {
  try {
    const response = await request.get('/user/medals', {
      params: { username },
    });

    if (response.status === 200) {
      return response.data.medals as Medal[];
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
  deleteUser,
  followUser,
  unfollowUser,
  editUser,
  getUser,
  getUserMedals,
};
