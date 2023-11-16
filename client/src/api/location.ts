// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Location,
  Dictionary,
  ErrorResponse,
  Media,
  User,
  ExternalHref,
  Review,
} from '../types';

/**
 * Creates a new location.
 *
 * @param {string} name Name of location.
 * @param {boolean} outdoors Whether it's outdoors.
 * @param {string} state State of location.
 * @param {string} address Address of location.
 * @param {string} color Color of location.
 * @param {ExternalHref} href Hrefs of location.
 * @param {Media[]} media Media of location.
 * @returns {Promise<Location | ErrorResponse>} Location created or an error.
 */
const createLocation = async (
  name: string,
  outdoors?: boolean,
  state?: string,
  address?: string,
  color?: string,
  href?: ExternalHref,
  media?: Media[],
): Promise<Location | ErrorResponse> => {
  try {
    const response = await request.post('/location/create', generateBody({
      name,
      outdoors,
      state,
      address,
      color,
      href,
      media,
    }));

    if (response.status === 201) {
      return response.data.location as Location;
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
 * Creates a new location review.
 *
 * @param {string} location Location of review.
 * @param {number} rating Rating of review.
 * @param {string} notes Notes of review.
 * @returns {Promise<Review | ErrorResponse>} Location review created or an error.
 */
const createLocationReview = async (
  location: string,
  rating: number,
  notes?: string,
): Promise<Review | ErrorResponse> => {
  try {
    const response = await request.post('/location/review', generateBody({
      location,
      rating,
      notes,
    }));

    if (response.status === 200) {
      return response.data.review as Review;
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
 * Deletes an existing location.
 *
 * @param {string} id ID of location.
 * @param {string[]} ids IDs of locations.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteLocation = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/location/delete', {
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
 * Deletes an existing location review.
 *
 * @param {string} location Location of the review.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteLocationReview = async (location: string): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/location/unreview', {
      params: { location },
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
 * Edits an existing location.
 *
 * @param {string} id ID of the location.
 * @param {string} name Name of location.
 * @param {boolean} outdoors Whether it's outdoors.
 * @param {string} state State of location.
 * @param {string} address Address of location.
 * @param {string} color Color of location.
 * @param {ExternalHref} href Hrefs of location.
 * @param {Media[]} media Media of location.
 * @returns {Promise<Location | ErrorResponse>} Location edited or an error.
 */
const editLocation = async (
  id: string,
  name?: string,
  outdoors?: boolean,
  state?: string,
  address?: string,
  color?: string,
  href?: ExternalHref,
  media?: Media[],
): Promise<Location | ErrorResponse> => {
  try {
    const response = await request.post('/location/edit', generateBody({
      id,
      name,
      outdoors,
      state,
      address,
      color,
      href,
      media,
    }));

    if (response.status === 200) {
      return response.data.location as Location;
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
 * Edits an existing location review.
 *
 * @param {string} location ID of the location.
 * @param {string} rating Rating of location.
 * @param {string} notes Notes of location.
 * @returns {Promise<Review | ErrorResponse>} Location review edited or an error.
 */
const editLocationReview = async (
  location: string,
  rating?: string,
  notes?: string,
): Promise<Review | ErrorResponse> => {
  try {
    const response = await request.post('/location/rereview', generateBody({
      location,
      rating,
      notes,
    }));

    if (response.status === 200) {
      return response.data.review as Review;
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
 * Retrieves a single location.
 *
 * @param {string} id ID of location.
 * @returns {Promise<Location | ErrorResponse>} Location and related objects.
 */
const getLocation = async (id: string): Promise<Location | ErrorResponse> => {
  try {
    const response = await request.get('/location/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data.location as Location;
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

interface GetLocationReviewsResponse {
  reviews: Review[];

  users: Dictionary<User>;

  average: number;
}

/**
 * Retrieves a single location's reviews.
 *
 * @param {string} id ID of location.
 * @param {number} offset Offset of reviews.
 * @param {number} limit Limit of reviews.
 * @returns {Promise<GetLocationReviewsResponse | ErrorResponse>}
 */
const getLocationReviews = async (
  id?: string,
  offset?: number,
  limit?: number,
): Promise<GetLocationReviewsResponse | ErrorResponse> => {
  try {
    const response = await request.get('/location/reviews', {
      params: generateBody({
        id,
        offset,
        limit,
      }),
    });

    if (response.status === 200) {
      return response.data as GetLocationReviewsResponse;
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
 * Retrieves multiple locations based on filters.
 *
 * @param {string[]} ids IDs of locations to retrieve.
 * @param {string} state State of location.
 * @param {string} outdoors Whether it's outdoors.
 * @param {boolean} userSpecific Whether to retrieve user-specific locations.
 * @returns {Promise<Location[] | ErrorResponse>} Location objects.
 */
const getLocations = async (
  ids?: string[],
  state?: string,
  outdoors?: boolean,
  userSpecific?: boolean,
): Promise<Location[] | ErrorResponse> => {
  try {
    const response = await request.get('/location/gets', {
      params: generateBody({
        ids: ids ? ids.join(';') : undefined,
        state,
        outdoors,
        userSpecific,
      }),
    });

    if (response.status === 200) {
      return response.data.locations as Location[];
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
  createLocation,
  createLocationReview,
  deleteLocation,
  deleteLocationReview,
  editLocation,
  editLocationReview,
  getLocation,
  getLocationReviews,
  getLocations,
};
