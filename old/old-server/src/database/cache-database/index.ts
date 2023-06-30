// Local Imports
import {
  Follow,
  LocationRating,
  Location,
  Medal,
  Session,
  Token,
  User,
} from './daos';
import { Monitor } from '../../helpers/monitor';
import { Database } from '../database';
import { MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS } from '../../config/messages';

/**
 * Non-persistant cache database for testing.
 */
export class CacheDatabase extends Database {
  /**
   * Data access object for Follows.
   */
  follow: Follow;

  /**
   * Data access object for Locations.
   */
  location: Location;

  /**
   * Data access object for Location Ratings.
   */
  locationRating: LocationRating;

  /**
   * Data access object for Medals.
   */
  medal: Medal;

  /**
   * Data access object for Sessions.
   */
  session: Session;

  /**
   * Data access object for Tokens.
   */
  token: Token;

  /**
   * Data access object for Users.
   */
  user: User;

  /**
   * Instantiates CacheDatabase with correct queries.
   */
  constructor() {
    super();

    this.follow = new Follow();
    this.location = new Location();
    this.locationRating = new LocationRating();
    this.medal = new Medal();
    this.session = new Session();
    this.token = new Token();
    this.user = new User();
  }

  /**
   * Connects to database.
   */
  async connect(): Promise<void> {
    Monitor.log(
      CacheDatabase,
      MESSAGE_DATABASE_CACHE_CONNECTION_SUCCESS,
      Monitor.Layer.WARNING,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */

  isConnected(): boolean {
    return true;
  }
}
