/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import {
  Follow,
  Location,
  LocationRating,
  Medal,
  Session,
  Token,
  User,
  DataAccessObject,
} from '../types';
import { UsedAbstractDatabaseError } from '../errors/used-abstract-database-error';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Follows.
   */
  follow: DataAccessObject<Follow>;

  /**
   * Data access object for Locations.
   */
  location: DataAccessObject<Location>;

  /**
   * Data access object for Location Ratings.
   */
  locationRating: DataAccessObject<LocationRating>;

  /**
   * Data access object for Medals.
   */
  medal: DataAccessObject<Medal>;

  /**
   * Data access object for Sessions.
   */
  session: DataAccessObject<Session>;

  /**
   * Data access object for Tokens.
   */
  token: DataAccessObject<Token>;

  /**
   * Data access object for Users.
   */
  user: DataAccessObject<User>;

  /**
   * Connects to database.
   *
   * @param {string | undefined} [databaseUrl=''] Database URL.
   * @param {string | undefined} [databaseUser=''] Database username.
   * @param {string | undefined} [databasePassword=''] Database password.
   */
  async connect(
    databaseUrl = '',
    databaseUser = '',
    databasePassword = '',
  ): Promise<void> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected(): boolean {
    return false;
  }
}
