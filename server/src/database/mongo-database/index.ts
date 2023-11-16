// Packages
import {
  connect,
  connection,
} from 'mongoose';

// Local Imports
import {
  Area,
  Attempt,
  Follow,
  Interest,
  Location,
  Medal,
  Post,
  Rating,
  Review,
  Route,
  Session,
  Shoes,
  Token,
  User
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
   * Data access object for Attempts.
   */
  area: Area;

  /**
   * Data access object for Attempts.
   */
  attempt: Attempt;

  /**
   * Data access object for Follows.
   */
  follow: Follow;

  /**
   * Data access object for Interests.
   */
  interest: Interest;

  /**
   * Data access object for Locations.
   */
  location: Location;

  /**
   * Data access object for Medals.
   */
  medal: Medal;

  /**
   * Data access object for Posts.
   */
  post: Post;

  /**
   * Data access object for Ratings.
   */
  rating: Rating;

  /**
   * Data access object for Reviews.
   */
  review: Review;

  /**
   * Data access object for Routes.
   */
  route: Route;

  /**
   * Data access object for Sessions.
   */
  session: Session;

  /**
   * Data access object for Shoess.
   */
  shoes: Shoes;

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

    this.area = new Area();
    this.attempt = new Attempt();
    this.follow = new Follow();
    this.interest = new Interest();
    this.location = new Location();
    this.medal = new Medal();
    this.post = new Post();
    this.rating = new Rating();
    this.review = new Review();
    this.route = new Route();
    this.session = new Session();
    this.shoes = new Shoes();
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
    return connection.readyState === 1;
  }
}
