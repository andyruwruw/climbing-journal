// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Area,
  AreaType,
  Dictionary,
  ErrorResponse,
  ExternalHref,
  Media,
  Route,
} from '../types';

/**
 * Creates a new area under a location.
 *
 * @param {string} name Name of area.
 * @param {string} location Location of area.
 * @param {string[]} altNames Alternate names of area.
 * @param {string} parent Parent of area.
 * @param {AreaType} type Type of area.
 * @param {string} color Color of area.
 * @param {ExternalHref} href Href of area.
 * @param {Media[]} media Media of area.
 * @returns {Promise<Area | ErrorResponse>} Area created or an error.
 */
const createArea = async (
  name: string,
  location: string,
  altNames?: string[],
  parent?: string,
  type?: AreaType,
  color?: string,
  href?: ExternalHref,
  media?: Media[],
): Promise<Area | ErrorResponse> => {
  try {
    const response = await request.post('/area/create', generateBody({
      name,
      location,
      altNames,
      parent,
      type,
      color,
      href,
      media,
    }));

    if (response.status === 201) {
      return response.data.area as Area;
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
 * Deletes an existing area.
 *
 * @param {string} id ID of area.
 * @param {string[]} ids IDs of areas.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteArea = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/area/delete', {
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
 * Edits an existing area.
 *
 * @param {string} id ID of the area.
 * @param {string} name Name of area.
 * @param {string} location Location of area.
 * @param {string[]} altNames Alternate names of area.
 * @param {string} parent Parent of area.
 * @param {AreaType} type Type of area.
 * @param {string} color Color of area.
 * @param {ExternalHref} href Href of area.
 * @param {Media[]} media Media of area.
 * @returns {Promise<Area | ErrorResponse>} Area edited or an error.
 */
const editArea = async (
  id: string,
  name?: string,
  location?: string,
  altNames?: string[],
  parent?: string,
  type?: AreaType,
  color?: string,
  href?: ExternalHref,
  media?: Media[],
): Promise<Area | ErrorResponse> => {
  try {
    const response = await request.post('/area/edit', generateBody({
      id,
      name,
      location,
      altNames,
      parent,
      type,
      color,
      href,
      media,
    }));

    if (response.status === 200) {
      return response.data.area as Area;
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

interface AreaChildren {
  areas: Area[];

  routs: Route[];
}

interface GetAreaResponse {
  area: Area;

  children: Dictionary<AreaChildren>;
}

/**
 * Retrieves a single area.
 *
 * @param {string} id ID of area.
 * @returns {Promise<GetAreaResponse | ErrorResponse>} Area and children or error.
 */
const getArea = async (id: string): Promise<GetAreaResponse | ErrorResponse> => {
  try {
    const response = await request.get('/area/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data as GetAreaResponse;
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

interface GetAreasResponse {
  areas: Area[];

  children: Dictionary<AreaChildren>;
}

/**
 * Retrieves multiple areas based on filters.
 *
 * @param {string} ids IDs of areas to retrieve.
 * @param {string} location Location of area.
 * @param {string} parent Parent of area.
 * @param {AreaType} type Type of area.
 * @param {string} username Username of submitted.
 * @returns {Promise<GetAreasResponse | ErrorResponse>} Areas or error.
 */
const getAreas = async (
  ids?: string[],
  location?: string,
  parent?: string,
  type?: AreaType,
  username?: string,
): Promise<GetAreasResponse | ErrorResponse> => {
  try {
    const response = await request.get('/area/gets', {
      params: generateBody({
        ids: ids ? ids.join(';') : undefined,
        location,
        parent,
        type,
        username,
      }),
    });

    if (response.status === 200) {
      return response.data as GetAreasResponse;
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
  createArea,
  deleteArea,
  editArea,
  getArea,
  getAreas,
};
