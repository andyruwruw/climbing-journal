// Types
import { UserSends } from '../types';

/**
 * Database type enum.
 */
export const DATABASE_TYPES = {
  MONGO: 'mongo',
  CACHE: 'cache',
};

/**
 * User privacy type enum.
 */
export const USER_PRIVACY = {
  UNLISTED: 'unlisted',
  PUBLIC: 'public',
  PRIVATE: 'private',
};

/**
 * Developmental URL for cors.
 */
export const DEVELOPMENT_URL = 'http://localhost:3000';

/**
 * Production URL for cors.
 */
export const PRODUCTION_URL = 'climbing-journal.vercel.app';

/**
 * Generates an empty max sends object.
 *
 * @returns {MaxSends} An empty MaxSends object.
 */
export const generateEmptyMaxSends = (): UserSends => ({
  indoorBoulder: -2,
  indoorBoulderFlash: -2,
  indoorTopRope: -2,
  indoorTopRopeFlash: -2,
  indoorTopRopeOnsight: -2,
  indoorLead: -2,
  indoorLeadFlash: -2,
  indoorLeadOnsight: -2,
  outdoorBoulder: -2,
  outdoorBoulderFlash: -2,
  outdoorTopRopeFlash: -2,
  outdoorTopRopeOnsight: -2,
  outdoorLead: -2,
  outdoorLeadFlash: -2,
  outdoorLeadOnsight: -2,
  outdoorTrad: -2,
  outdoorTradFlash: -2,
  outdoorTradOnsight: -2,
  outdoorIce: -2,
  outdoorAid: -2,
  outdoorMixed: -2,  
  indoorBoulderSubgrade: 0,
  indoorBoulderFlashSubgrade: 0,
  indoorTopRopeSubgrade: 0,
  indoorTopRopeFlashSubgrade: 0,
  indoorTopRopeOnsightSubgrade: 0,
  indoorLeadSubgrade: 0,
  indoorLeadFlashSubgrade: 0,
  indoorLeadOnsightSubgrade: 0,
  outdoorBoulderSubgrade: 0,
  outdoorBoulderFlashSubgrade: 0,
  outdoorTopRopeFlashSubgrade: 0,
  outdoorTopRopeOnsightSubgrade: 0,
  outdoorLeadSubgrade: 0,
  outdoorLeadFlashSubgrade: 0,
  outdoorLeadOnsightSubgrade: 0,
  outdoorTradSubgrade: 0,
  outdoorTradFlashSubgrade: 0,
  outdoorTradOnsightSubgrade: 0,
  outdoorIceSubgrade: 0,
  outdoorAidSubgrade: 0,
  outdoorMixedSubgrade: 0,
});

/**
 * Salting rounds.
 */
export const SALT_WORK_FACTOR = 12;

/**
 * Name of the login cookie.
 */
export const COOKIE_NAME = 'climbingjournalcookie';
