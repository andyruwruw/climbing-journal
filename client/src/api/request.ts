// Packages
import axios from 'axios';

// Local Imports
import { API_BASE_URL } from '../config';

/**
 * Axios instance set up for the API.
 */
const request = axios.create({
  baseURL: API_BASE_URL,
});

export default request;
