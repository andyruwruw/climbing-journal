// Local Imports
import request from './request';

// Types
import {
  MaxSends,
  Medal,
  Session,
  SessionFocus,
  User,
} from '../types';

/**
 * Follows a user.
 *
 * @returns {Promise<null>} Promise of the action.
 */
const follow = async (id: string): Promise<null> => {
  try {
    await request.post(`/user/follow?id=${id}`);
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a user's followers.
 *
 * @returns {Promise<User[]>} Promise of the action.
 */
const getFollowers = async (id: string): Promise<User[]> => {
  try {
    const response = await request.post(`/user/get-followers?id=${id}`);

    if (response.status === 200) {
      return response.data.followers;
    }
    return [] as User[];
  } catch (error) {
    return [] as User[];
  }
};

/**
 * Retrieves a user's followings.
 *
 * @returns {Promise<User[]>} Promise of the action.
 */
const getFollowings = async (id: string): Promise<User[]> => {
  try {
    const response = await request.post(`/user/get-followings?id=${id}`);

    if (response.status === 200) {
      return response.data.followers;
    }
    return [] as User[];
  } catch (error) {
    return [] as User[];
  }
};

/**
 * Retrieves a user's medals.
 *
 * @returns {Promise<Medal[]>} Promise of the action.
 */
const getMedals = async (id: string): Promise<Medal[]> => {
  try {
    const response = await request.post(`/user/get-medals?id=${id}`);

    if (response.status === 200) {
      return response.data.medals;
    }
    return [] as Medal[];
  } catch (error) {
    return [] as Medal[];
  }
};

/**
 * Retrieves a user.
 *
 * @returns {Promise<User | null>} Promise of the action.
 */
const get = async (id: string): Promise<User | null> => {
  try {
    const response = await request.post(`/user/get?id=${id}`);

    if (response.status === 200) {
      return response.data.user;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Unfollows a user.
 *
 * @returns {Promise<null>} Promise of the action.
 */
const unfollow = async (id: string): Promise<null> => {
  try {
    await request.post(`/user/unfollow?id=${id}`);
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Edits an existing user.
 *
 * @returns {Promise<User | null>} User if edited, null otherwise.
 */
const update = async (
  name = undefined as undefined | string,
  password = undefined as undefined | string,
  started = undefined as undefined | number,
  height = undefined as undefined | number,
  span = undefined as undefined | number,
  weight = undefined as undefined | number,
  image = undefined as undefined | string,
): Promise<Session | null> => {
  try {
    const response = await request.post(
      '/user/edit',
      {
        name,
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
};

export default {
  follow,
  getFollowers,
  getFollowings,
  getMedals,
  get,
  unfollow,
  update,
};
