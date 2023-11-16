// Local Imports
import request, { generateBody } from './request';

// Types
import {
  Dictionary,
  ErrorResponse,
  Rating,
  Route,
  Shoes,
  User,
} from '../types';

/**
 * Deletes an existing shoes.
 *
 * @param {string} id ID of shoes.
 * @param {string[]} ids IDs of shoes.
 * @returns {Promise<null | ErrorResponse>} Null if successful, or error.
 */
const deleteShoes = async (
  id?: string,
  ids?: string[],
): Promise<null | ErrorResponse> => {
  try {
    const response = await request.get('/shoes/delete', {
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
 * Edits an existing shoes.
 *
 * @param {string} id ID of the shoes.
 * @param {number} date Date of shoes.
 * @param {string} brand Brand of shoes.
 * @param {string} model Model of shoes.
 * @param {string} volume Volume of shoes.
 * @param {number} sizeUS US size of shoes.
 * @param {number} sizeEU EU size of shoes.
 * @param {string} acquired Acquired status of shoes.
 * @param {string} status Status of shoes.
 * @param {boolean} resoled Resoled status of shoes.
 * @param {number} resoleDate Resole date of shoes.
 * @param {string} resoleRubber Resole rubber of shoes.
 * @param {string} notes Notes of shoes.
 * @returns {Promise<Shoes | ErrorResponse>} Shoes edited or an error.
 */
const editShoes = async (
  id: string,
  date?: number,
  brand?: string,
  model?: string,
  volume?: string,
  sizeUS?: number,
  sizeEU?: number,
  acquired?: string,
  status?: string,
  resoled?: boolean,
  resoleDate?: number,
  resoleRubber?: string,
  notes?: string,
): Promise<Shoes | ErrorResponse> => {
  try {
    const response = await request.post('/shoes/edit', generateBody({
      id,
      date,
      brand,
      model,
      volume,
      sizeUS,
      sizeEU,
      acquired,
      status,
      resoled,
      resoleDate,
      resoleRubber,
      notes,
    }));

    if (response.status === 200) {
      return response.data.shoes as Shoes;
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

interface GetShoeResponse {
  shoes: Shoes;

  rating: Rating;

  route: Route;

  user: User;
}

/**
 * Retrieves a single shoes.
 *
 * @param {string} id ID of shoes.
 * @returns {Promise<GetShoeResponse | ErrorResponse>} Shoes and related objects.
 */
const getShoe = async (id: string): Promise<GetShoeResponse | ErrorResponse> => {
  try {
    const response = await request.get('/shoes/get', {
      params: { id },
    });

    if (response.status === 200) {
      return response.data as GetShoeResponse;
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

interface GetShoesResponse {
  shoes: Shoes[];

  ratings: Dictionary<Dictionary<Rating>>;

  routes: Dictionary<Route>;

  users: Dictionary<User>;
}

/**
 * Retrieves multiple shoes based on filters.
 *
 * @param {string} user User of shoes.
 * @param {number} date Date of shoes.
 * @param {number} before Date of shoes before.
 * @param {number} after Date of shoes after.
 * @param {string} brand Brand of shoes.
 * @param {string} model Model of shoes.
 * @param {string} volume Volume of shoes.
 * @param {number} sizeUS US size of shoes.
 * @param {number} sizeEU EU size of shoes.
 * @param {string} acquired Acquired status of shoes.
 * @param {string} status Status of shoes.
 * @param {boolean} resoled Resoled status of shoes.
 * @param {number} resoleDate Resole date of shoes.
 * @param {string} resoleRubber Resole rubber of shoes.
 * @param {string} notes Notes of shoes.
 * @param {number} offset Offset of shoes.
 * @param {number} limit Limit of shoes.
 * @returns {Promise<GetShoesResponse | ErrorResponse>} Shoes with related tables.
 */
const getShoes = async (
  user?: string,
  date?: number,
  before?: number,
  after?: number,
  brand?: string,
  model?: string,
  volume?: string,
  sizeUS?: number,
  sizeEU?: number,
  acquired?: string,
  status?: string,
  resoled?: boolean,
  resoleRubber?: string,
  offset?: number,
  limit?: number,
): Promise<GetShoesResponse | ErrorResponse> => {
  try {
    const response = await request.get('/shoes/gets', {
      params: generateBody({
        user,
        date,
        before,
        after,
        brand,
        model,
        volume,
        sizeUS,
        sizeEU,
        acquired,
        status,
        resoled,
        resoleRubber,
        offset,
        limit,
      }),
    });

    if (response.status === 200) {
      return response.data as GetShoesResponse;
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
 * Creates a new shoes.
 *
 * @param {number} date Date of shoes.
 * @param {string} brand Brand of shoes.
 * @param {string} model Model of shoes.
 * @param {string} volume Volume of shoes.
 * @param {number} sizeUS US size of shoes.
 * @param {number} sizeEU EU size of shoes.
 * @param {string} acquired Acquired status of shoes.
 * @param {string} status Status of shoes.
 * @param {boolean} resoled Resoled status of shoes.
 * @param {number} resoleDate Resole date of shoes.
 * @param {string} resoleRubber Resole rubber of shoes.
 * @param {string} notes Notes of shoes.
 * @returns {Promise<Shoes | ErrorResponse>} Shoes created or an error.
 */
const logShoes = async (
  date?: number,
  brand?: string,
  model?: string,
  volume?: string,
  sizeUS?: number,
  sizeEU?: number,
  acquired?: string,
  status?: string,
  resoled?: boolean,
  resoleDate?: number,
  resoleRubber?: string,
  notes?: string,
): Promise<Shoes | ErrorResponse> => {
  try {
    const response = await request.post('/shoes/log', generateBody({
      date,
      brand,
      model,
      volume,
      sizeUS,
      sizeEU,
      acquired,
      status,
      resoled,
      resoleDate,
      resoleRubber,
      notes,
    }));

    if (response.status === 201) {
      return response.data.shoes as Shoes;
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
  deleteShoes,
  editShoes,
  getShoe,
  getShoes,
  logShoes,
};
