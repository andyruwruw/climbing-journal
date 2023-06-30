// Packages
import dotenv from 'dotenv';

// Local Imports
import {
  DEVELOPMENT_URL,
  PRODUCTION_URL,
} from '../config';

dotenv.config();

/**
 * Static methods for retrieving environment variables.
 */
export class Environment {
  /**
   * Retrieves password for connecting with database if needed.
   *
   * @returns {string} Password for connecting with database if needed.
   */
  static getDatabasePassword(): string {
    return process.env.DATABASE_PASSWORD as string || '';
  }

  /**
   * Retrieves type of database to use.
   *
   * @returns {string} Type of database to use.
   */
  static getDatabaseType(): string {
    return process.env.DATABASE_TYPE as string || 'cache';
  }

  /**
   * Retrieves URL for connecting with database if needed.
   *
   * @returns {string} URL for connecting with database if needed.
   */
  static getDatabaseUrl(): string {
    return process.env.DATABASE_URL as string || 'mongodb://localhost:27017/';
  }

  /**
   * Retrieves username for connecting with database if needed.
   *
   * @returns {string} Username for connecting with database if needed.
   */
  static getDatabaseUser(): string {
    return process.env.DATABASE_USER as string || '';
  }

  /**
   * Returns origin URL depending on environment.
   *
   * @returns {string} Origin URL.
   */
  static getOrigin(): string {
    if (process.env.ORIGIN_URL && process.env.ORIGIN_URL.length) {
      return process.env.ORIGIN_URL;
    }
    if (process.env.ENVIRONMENT === 'production') {
      return PRODUCTION_URL;
    }
    return DEVELOPMENT_URL;
  }

  /**
   * Retrieves server port.
   *
   * @returns {number} Server port.
   */
  static getPort(): number {
    return process.env.PORT ? parseInt(process.env.PORT as string, 10) : 3000;
  }

  /**
   * Whether log layer DEBUG is enabled.
   *
   * @returns {boolean} Whether log layer DEBUG is enabled.
   */
  static isDebugLayerEnabled(): boolean {
    return process.env.DISABLE_DEBUG_LAYER !== 'true';
  }

  /**
   * Whether log layer WARNING is enabled.
   *
   * @returns {boolean} Whether log layer WARNING is enabled.
   */
  static isWarningLayerEnabled(): boolean {
    return process.env.DISABLE_WARNING_LAYER !== 'true';
  }

  /**
   * Whether log layer UPDATE is enabled.
   *
   * @returns {boolean} Whether log layer UPDATE is enabled.
   */
  static isUpdateLayerEnabled(): boolean {
    return process.env.DISABLE_UPDATE_LAYER !== 'true';
  }

  /**
   * Retrieves server secret.
   *
   * @returns {string} Server secret.
   */
  static getSecret(): string {
    return process.env.SECRET as string;
  }
}
