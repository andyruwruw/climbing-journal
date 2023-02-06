// Local Imports
import request from './request';

// Types
import { LocationRating } from '../types';

/**
 * Creates a new location.
 *
 * @param {string} name Location name.
 * @param {string} locale Location locale.
 * @param {string} address Location address.
 * @param {boolean} outdoors Location outdoors.
 * @param {string} image Location image.
 * @returns {Promise<Location | null>} Location if successful.
 */
const create = async (
  name: string,
  locale = '',
  address = '',
  outdoors = false,
  image = '',
): Promise<Location | null> => {
  try {
    const response = await request.post(
      '/location/create',
      {
        name,
        locale,
        address,
        outdoors,
        image,
      },
    );

    if (response.status === 200) {
      return response.data.location;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Deletes an existing location.
 *
 * @param {string} id Location ID.
 * @returns {Promise<null>} Promise of action.
 */
const deleteLocation = async (id: string): Promise<null> => {
  try {
    await request.delete(`/location/delete?id=${id}`);
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Edits an existing location.
 *
 * @returns {Promise<Location | null>} Location if successful.
 */
const edit = async (
  id: string,
  name = null as string | null,
  locale = null as string | null,
  address = null as string | null,
  outdoors = null as boolean | null,
  image = null as string | null,
): Promise<Location | null> => {
  try {
    await request.put(
      '/location/edit',
      {
        id,
        name,
        locale,
        address,
        outdoors,
        image,
      },
    );
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a locations ratings.
 *
 * @returns {Promise<LocationRating[] | null>} Location's ratings if successful.
 */
const getRatings = async (id: string): Promise<LocationRating[] | null> => {
  try {
    const response = await request.get(`/location/get-ratings?id=${id}`);

    if (response.status === 200) {
      return response.data.ratings;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Retrieves a location..
 *
 * @returns {Promise<Location | null>} Location if successful.
 */
const get = async (id: string): Promise<Location | null> => {
  try {
    const response = await request.get(`/location/get?id=${id}`);

    if (response.status === 200) {
      return response.data.location;
    }
    return null;
  } catch (error) {
    return null;
  }
};

/**
 * Rates a location..
 *
 * @returns {Promise<Location | null>} Location if successful.
 */
const rate = async (
  id: string,
  notes = '',
  rating = 5,
): Promise<LocationRating | null> => {
  try {
    const response = await request.post(
      '/location/rate',
      {
        id,
        notes,
        rating,
      },
    );

    if (response.status === 200) {
      return response.data.rating;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export default {
  create,
  delete: deleteLocation,
  edit,
  getRatings,
  get,
  rate,
};
