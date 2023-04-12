// Packages
import {
  connect,
  connection,
} from 'mongoose';

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
import { Database } from '../database';
import { DatabaseUrlMissingError } from '../../errors/database-url-missing';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends Database {
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
   * Instantiates MongoDatabase with correct queries.
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
  async connect(
    databaseUrl = '',
    databaseUser = '',
    databasePassword = '',
  ): Promise<void> {
    if (!databaseUrl) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = databaseUrl
      .replace(
        '<user>',
        databaseUser,
      )
      .replace(
        '<password>',
        databasePassword,
      );
    await connect(authorizedUrl);

    Monitor.log(
      MongoDatabase,
      MESSAGE_DATABASE_CONNECTION_SUCCESS,
      Monitor.Layer.UPDATE,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    console.log(`Ready status: ${connection.readyState === 1}`);
    return connection.readyState === 1;
  }
}
