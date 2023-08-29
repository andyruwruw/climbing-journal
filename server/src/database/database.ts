/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import {
  Follow,
  Location,
  LocationRating,
  Medal,
  Session,
  Token,
  DataAccessObject as DataAccessObjectInterface,
  PrivateUser,
  Log,
  Route,
} from '../types';
import { DataAccessObject } from './dao';
import { UsedAbstractDatabaseError } from '../errors/used-abstract-database-error';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for Follows.
   */
  follow: DataAccessObjectInterface<Follow> = new DataAccessObject();

  /**
   * Data access object for Locations.
   */
  location: DataAccessObjectInterface<Location> = new DataAccessObject();

  /**
   * Data access object for Location Ratings.
   */
  locationRating: DataAccessObjectInterface<LocationRating> = new DataAccessObject();

  /**
   * Data access object for Logs.
   */
  log: DataAccessObjectInterface<Log> = new DataAccessObject();
  
  /**
   * Data access object for Medals.
   */
  medal: DataAccessObjectInterface<Medal> = new DataAccessObject();

  /**
   * Data access object for Routes.
   */
  route: DataAccessObjectInterface<Route> = new DataAccessObject();

  /**
   * Data access object for Sessions.
   */
  session: DataAccessObjectInterface<Session> = new DataAccessObject();

  /**
   * Data access object for Tokens.
   */
  token: DataAccessObjectInterface<Token> = new DataAccessObject();

  /**
   * Data access object for Users.
   */
  user: DataAccessObjectInterface<PrivateUser> = new DataAccessObject();

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
