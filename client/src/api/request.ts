// Packages
import { Dictionary } from '@/types';
import axios from 'axios';

const ApiBaseUrl = (): string => {
  if (process.env.VUE_APP_ENVIRONMENT !== 'development') {
    return 'http://localhost:3000/api';
  }
  return 'http://localhost:3000/api';
};

/**
 * Axios instance set up for the API.
 */
const request = axios.create({
  baseURL: ApiBaseUrl(),
});

/**
 * Generates request body devoid of undefined.
 *
 * @param {Dictionary<any>} body Any request body.
 * @returns {Dictionary<any>} Request body without undefined.
 */
export const generateBody = (body: Dictionary<any>): Dictionary<any> => (
  Object.entries(body).reduce((acc, [key, value]) => {
    if (value !== undefined) {
      acc[key] = value;
    }
    return acc;
  }, {} as Dictionary<any>));

export default request;
