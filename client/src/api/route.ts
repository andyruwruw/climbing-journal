// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Route,
  Dictionary,
  ErrorResponse,
  Media,
  User,
  ExternalHref,
  Review,
  RouteType,
  Rating,
  Area,
} from '../types';

/**
 * Creates a new route.
 *
 * @param {string} name Name of route.
 * @param {string} location Location of route.
 * @param {RouteType} type Type of route.
 * @param {boolean} multiPitch Whether it's multi-pitch.
 * @param {string[]} altNames Alternate names of route.
 * @param {string} state State of route.
 * @param {string} area Area of route.
 * @param {ExternalHref} href Href of route.
 * @param {number} grade Grade of route.
 * @param {number} subGrade Sub-grade of route.
 * @param {number} danger Danger of route.
 * @param {Media[]} media Media of route.
 * @returns {Promise<Route | ErrorResponse>} route created or an error.
 */
const createRoute = async (
  name: string,
  location: string,
  type: RouteType,
  multiPitch?: boolean,
  altNames?: string[],
  state?: string,
  area?: string,
  href?: ExternalHref,
  grade?: number,
  subGrade?: number,
  danger?: number,
  media?: Media[],
): Promise<Route | ErrorResponse> => {
  try {
    const response = await request.post('/route/create', generateBody({
      name,
      location,
      type,
      multiPitch,
      altNames,
      state,
      area,
      href,
      grade,
      subGrade,
      danger,
      media,
    }));

    if (response.status === 201) {
      return response.data.route as Route;
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
 * Deletes an existing route.
 *
 * @param {string} id ID of route.
 * @param {string[]} ids IDs of routes.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteRoute = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/route/delete', {
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
 * Deletes an existing route rating.
 *
 * @param {string} route Route of the rating.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteRouteRating = async (route: string): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/route/unrate', {
      params: { route },
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
 * Edits an existing route.
 *
 * @param {string} id ID of the route.
 * @param {string} name Name of route.
 * @param {string} location Location of route.
 * @param {RouteType} type Type of route.
 * @param {boolean} multiPitch Whether it's multi-pitch.
 * @param {string[]} altNames Alternate names of route.
 * @param {string} state State of route.
 * @param {string} area Area of route.
 * @param {ExternalHref} href Href of route.
 * @param {number} grade Grade of route.
 * @param {number} subGrade Sub-grade of route.
 * @param {number} danger Danger of route.
 * @param {Media[]} media Media of route.
 * @returns {Promise<Route | ErrorResponse>} Route edited or an error.
 */
const editRoute = async (
  id: string,
  name?: string,
  location?: string,
  type?: string,
  multiPitch?: boolean,
  altNames?: string[],
  state?: string,
  area?: string,
  href?: ExternalHref,
  grade?: number,
  subGrade?: number,
  danger?: number,
  media?: Media[],
): Promise<Route | ErrorResponse> => {
  try {
    const response = await request.post('/route/edit', generateBody({
      id,
      name,
      location,
      type,
      multiPitch,
      altNames,
      state,
      area,
      href,
      grade,
      subGrade,
      danger,
      media,
    }));

    if (response.status === 200) {
      return response.data.route as Route;
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
 * Edits an existing route rating.
 *
 * @param {string} route ID of the route.
 * @param {number} suggestedGrade Suggested grade of rating.
 * @param {number} suggestedSubGrade Suggested sub-grade of rating.
 * @param {number} rating Rating of rating.
 * @returns {Promise<Rating | ErrorResponse>} Route rating edited or an error.
 */
const editRouteRating = async (
  route: string,
  suggstedGrade?: number,
  suggestedSubGrade?: number,
  rating?: number,
): Promise<Rating | ErrorResponse> => {
  try {
    const response = await request.post('/route/rerate', generateBody({
      route,
      suggstedGrade,
      suggestedSubGrade,
      rating,
    }));

    if (response.status === 200) {
      return response.data.rating as Rating;
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

interface GetRouteResponse {
  route: Route;

  location: Location;

  area: Area;
}

/**
 * Retrieves a single route.
 *
 * @param {string} id ID of route.
 * @returns {Promise<GetRouteResponse | ErrorResponse>} Route and related objects.
 */
const getRoute = async (id: string): Promise<GetRouteResponse | ErrorResponse> => {
  try {
    const response = await request.get('/route/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data as GetRouteResponse;
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

interface GetRouteRatingsResponse {
  ratings: Review[];

  users: Dictionary<User>;

  average: number;
}

/**
 * Retrieves a single route's ratings.
 *
 * @param {string} route ID of route.
 * @param {number} offset Offset of ratings.
 * @param {number} limit Limit of ratings.
 * @returns {Promise<GetRouteRatingsResponse | ErrorResponse>}
 */
const getRouteRatings = async (
  route: string,
  offset?: number,
  limit?: number,
): Promise<GetRouteRatingsResponse | ErrorResponse> => {
  try {
    const response = await request.get('/route/ratings', {
      params: generateBody({
        route,
        offset,
        limit,
      }),
    });

    if (response.status === 200) {
      return response.data as GetRouteRatingsResponse;
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
 * Retrieves multiple route based on filters.
 *
 * @param {string[]} ids IDs of routes to retrieve.
 * @param {string} location Location of route.
 * @param {string} area Area of route.
 * @param {string} state State of route.
 * @param {boolean} multiPitch Whether it's multi-pitch.
 * @param {RouteType} type Type of route.
 * @param {number} grade Grade of route.
 * @param {number} subGrade Sub-grade of route.
 * @param {number} danger Danger of route.
 * @param {number} rating Rating of route.
 * @param {boolean} submitted Whether to target submitted routes.
 * @param {boolean} interested Whether to target interested routes.
 * @param {boolean} attempted Whether to target attempted routes.
 * @param {boolean} sent Whether to target sent routes.
 * @param {number} limit Limit of routes.
 * @param {number} offset Offset of routes.
 * @returns {Promise<Route[] | ErrorResponse>} Route objects.
 */
const getRoutes = async (
  ids?: string[],
  location?: string,
  area?: string,
  state?: string,
  multiPitch?: boolean,
  type?: RouteType,
  grade?: number,
  subGrade?: number,
  danger?: number,
  rating?: number,
  submitted?: boolean,
  interested?: boolean,
  attempted?: boolean,
  sent?: boolean,
  limit?: number,
  offset?: number,
): Promise<Route[] | ErrorResponse> => {
  try {
    const response = await request.get('/route/gets', {
      params: generateBody({
        ids: ids ? ids.join(';') : undefined,
        location,
        area,
        state,
        multiPitch,
        type,
        grade,
        subGrade,
        danger,
        rating,
        submitted,
        interested,
        attempted,
        sent,
        limit,
        offset,
      }),
    });

    if (response.status === 200) {
      return response.data.route as Route[];
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
 * Creates a new route review.
 *
 * @param {string} route route of review.
 * @param {number} rating Rating of review.
 * @param {string} notes Notes of review.
 * @returns {Promise<Review | ErrorResponse>} route review created or an error.
 */
const rateRoute = async (
  route: string,
  rating: number,
  notes?: string,
): Promise<Review | ErrorResponse> => {
  try {
    const response = await request.post('/route/review', generateBody({
      route,
      rating,
      notes,
    }));

    if (response.status === 201) {
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

export default {
  createRoute,
  rateRoute,
  deleteRoute,
  deleteRouteRating,
  editRoute,
  editRouteRating,
  getRoute,
  getRouteRatings,
  getRoutes,
};
