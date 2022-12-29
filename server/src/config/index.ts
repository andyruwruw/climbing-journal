import { MaxSends } from "../types";

/**
 * Database type enum.
 */
 export const DATABASE_TYPES = {
  MONGO: 'mongodb',
  CACHE: 'cache',
};

/**
 * Developmental URL for cors.
 */
export const DEVELOPMENT_URL = 'http://localhost:3000';

/**
 * Production URL for cors.
 */
export const PRODUCTION_URL = '';

/**
 * Maximum number of dependent objects.
 */
export const MAX_DEPENDENCIES = 20;

/**
 * Generates an empty max sends object.
 *
 * @returns {MaxSends} An empty MaxSends object.
 */
export const generateEmptyMaxSends = (): MaxSends => ({
  boulder: null,
  topRope: null,
  sport: null,
  trad: null,
  speed: null,
  mixed: null,
  ice: null,
});
