// Packages
import {
  Request,
  Response,
} from 'express';
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

/**
 * Generic database item.
 */
interface DatabaseItem {
  /**
   * Unique identifier.
   */
  _id?: string;
}

/**
 * References to href of routes.
 */
interface ExternalHref {
  /**
   * Mountain project page of item.
   */
  moutainProject?: string;

  /**
   * Google maps link of item..
   */
  googleMaps?: string;
}

/**
 * Generic object for logging sends.
 */
interface UserSends {
  indoorBoulder?: number;

  indoorBoulderFlash?: number;

  indoorTopRope?: number;

  indoorTopRopeFlash?: number;

  indoorTopRopeOnsight?: number;

  indoorLead?: number;

  indoorLeadFlash?: number;

  indoorLeadOnsight?: number;

  outdoorBoulder?: number;

  outdoorBoulderFlash?: number;

  outdoorTopRopeFlash?: number;

  outdoorTopRopeOnsight?: number;

  outdoorLead?: number;

  outdoorLeadFlash?: number;

  outdoorLeadOnsight?: number;

  outdoorTrad?: number;

  outdoorTradFlash?: number;

  outdoorTradOnsight?: number;

  outdoorIce?: number;

  outdoorAid?: number;

  outdoorMixed?: number;
  
  indoorBoulderSubgrade?: number;

  indoorBoulderFlashSubgrade?: number;

  indoorTopRopeSubgrade?: number;

  indoorTopRopeFlashSubgrade?: number;

  indoorTopRopeOnsightSubgrade?: number;

  indoorLeadSubgrade?: number;

  indoorLeadFlashSubgrade?: number;

  indoorLeadOnsightSubgrade?: number;

  outdoorBoulderSubgrade?: number;

  outdoorBoulderFlashSubgrade?: number;

  outdoorTopRopeFlashSubgrade?: number;

  outdoorTopRopeOnsightSubgrade?: number;

  outdoorLeadSubgrade?: number;

  outdoorLeadFlashSubgrade?: number;

  outdoorLeadOnsightSubgrade?: number;

  outdoorTradSubgrade?: number;

  outdoorTradFlashSubgrade?: number;

  outdoorTradOnsightSubgrade?: number;

  outdoorIceSubgrade?: number;

  outdoorAidSubgrade?: number;

  outdoorMixedSubgrade?: number;
}

/**
 * Database session log.
 */
interface Session extends DatabaseItem {
  /**
   * User of session.
   */
  user: string;

  /**
   * Date of session.
   */
  date: Date;

  /**
   * Starting time of session.
   */
  start: Date;
  
  /**
   * End of session.
   */
  end: Date;

  /**
   * Total duration of session.
   */
  duration: number;

  /**
   * Images from session.
   */
  images: string[];

  /**
   * Videos from session.
   */
  videos: string[];

  /**
   * Location of session.
   */
  location: string;

  /**
   * State of session.
   */
  state: string;

  /**
   * Whether the session was indoors.
   */
  indoors: boolean;

  /**
   * Max sends of user at time of session.
   */
  max?: UserSends;

  /**
   * How the day felt.
   */
  felt: number;

  /**
   * Top sends of the day.
   */
  sends?: UserSends;

  /**
   * Notes about the session.
   */
  notes: string;

  /**
   * Climbing types.
   */
  focuses: RouteType[];
}
type SessionReference = string | Session;

type AttemptStatus = 'sent' | 'attempt' | 'flash' | 'onsight' | 'top-rope' | 'lead' | 'trad' | 'ice' | 'mixed' | 'aid' | 'other' | 'one-hang' | 'project' | 'touch' | 'day-flash' | 'unknown';

/**
 * Log of attempt on route.
 */
interface Log extends DatabaseItem {
  /**
   * User on route.
   */
  user: string;

  /**
   * Route unique identifier.
   */
  route: String;

  /**
   * Date attempted.
   */
  date: Date;

  /**
   * Images from session.
   */
  images: string[];

  /**
   * Videos from session.
   */
  videos: string[];

  /**
   * Status of attempt.
   */
  status: AttemptStatus;

  /**
   * Number of attempts.
   */
  attempts: number;

  /**
   * Notes on route.
   */
  notes: string;

  /**
   * How the route felt.
   */
  felt: number;

  /**
   * Self grade of route.
   */
  rating: number;
}
type LogReference = string | Log;

type RouteType = 'boulder' | 'multi-pitch' | 'top-rope' | 'lead' | 'trad' | 'ice' | 'mixed' | 'aid' | 'other';

/**
 * Route logged in database.
 */
interface Route extends DatabaseItem {
  /**
   * Name of the route.
   */
  name: string;

  /**
   * Type of climb.
   */
  type: RouteType;

  /**
   * Location of the route.
   */
  location: string;

  /**
   * State the route is in.
   */
  state: string;

  /**
   * Area within location.
   */
  area: string;

  /**
   * Wall or boulder.
   */
  wall: string;

  /**
   * Href to project.
   */
  href?: ExternalHref;

  /**
   * Grade of the route.
   */
  grade: number;

  /**
   * Subgrade of the route.
   */
  subgrade: number;

  /**
   * Danger level of route.
   */
  danger: number;

  /**
   * Rating for route.
   */
  rated: number;

  /**
   * When the route was updated.
   */
  updated: Date;
}
type RouteReference = string | Route;

/**
 * Location of climbing.
 */
interface Location extends DatabaseItem {
  /**
   * Name of crag.
   */
  name: string;

  /**
   * Hrefs to crag.
   */
  href: ExternalHref;

  /**
   * Whether the location is indoors.
   */
  indoors: boolean;

  /**
   * State of location.
   */
  state: string;

  /**
   * Number of hours.
   */
  hours?: number;

  /**
   * Number of sessions.
   */
  sessions?: number;
}
type LocationReference = string | Location;

interface LocationRating extends DatabaseItem {
  /**
   * User who rated the location.
   */
  user: UserReference;

  /**
   * Location that was rated.
   */
  location: LocationReference;

  /**
   * Notes on the location.
   */
  notes: string;

  /**
   * Rating given for location.
   */
  rating: number;

  /**
   * Date of rating.
   */
  updated: Date;
}
type LocationRatingReference = string | LocationRating;

interface Medal extends DatabaseItem {
  /**
   * User awardee.
   */
  user: UserReference;

  /**
   * Ldoation if applicable.
   */
  location: LocationReference | null;

  /**
   * Type of award.
   */
  type: string;

  /**
   * Data for award.
   */
  data: string;

  /**
   * Wh3n award was given.
   */
  created?: Date;
}
type MedalReference = string | Medal;

/**
 * Session token.
 */
interface Token extends DatabaseItem {
  /**
   * User logged in.
   */
  user: UserReference;

  /**
   * Login token.
   */
  token: string;

  /**
   * Date created.
   */
  created?: Date;
}
type TokenReference = string | Token;

/**
 * User privacy settings.
 */
type UserPrivacy = 'unlisted' | 'private' | 'public';

/**
 * User object.
 */
interface User extends DatabaseItem {
  /**
   * Name of user.
   */
  name: string;

  /**
   * Username of user.
   */
  username: string;

  /**
   * When the user started climbing.
   */
  started: Date;

  /**
   * Height of user.
   */
  height: number;

  /**
   * Span of the user.
   */
  span: number;

  /**
   * Weight of the user.
   */
  weight: number;

  /**
   * When the account was created.
   */
  created?: Date;

  /**
   * User image.
   */
  image: string;

  /**
   * User privacy setting.
   */
  privacy: UserPrivacy;
}
interface PrivateUser extends User {
  /**
   * User password.
   */
  password: string;

  /**
   * Whether the user is an admin.
   */
  admin?: boolean;
}
type UserReference = string | User;

/**
 * User following users.
 */
interface Follow extends DatabaseItem {
  /**
   * User following.
   */
  user: UserReference;

  /**
   * 
   */
  following: UserReference;

  /**
   * When the user was followed.
   */
  created?: Date;
}
type FollowReference = string | Follow;

/**
 * Types of data in the database.
 */
export type DatabaseColumnTypes = string | number | boolean | Date | string[] | number[];

/**
 * Filter object used to limit queries.
 */
export interface QueryFilter {
  [key: string]: DatabaseColumnTypes
  | DatabaseColumnTypes[]
  | Record<string, DatabaseColumnTypes
  | DatabaseColumnTypes[]>;
}

/**
 * Projection on queries to limit columns.
 */
export type QueryProjection = Record<string, number> | string | string[];

/**
 * Update object used to update data in the database.
 */
export interface UpdateQuery {
  [key: string]: DatabaseColumnTypes | Record<string, DatabaseColumnTypes>;
}

export interface DataAccessObject<T> {
  _create: (item: T) => Promise<T>;
  create: (...args: any[]) => Promise<T>;

  findOne: (
    filter?: QueryFilter,
    projection?: QueryProjection,
  ) => Promise<T | null>;

  find: (
    filter?: QueryFilter,
    projection?: QueryProjection,
    offset?: number,
    limit?: number,
  ) => Promise<T[]>;

  findById: (id: string) => Promise<T | null>;

  delete: (filter?: QueryFilter) => Promise<number>;

  deleteById: (id: string) => Promise<boolean>;

  updateOne: (
    filter?: QueryFilter,
    update?: UpdateQuery,
    insertNew?: boolean,
  ) => Promise<boolean>;

  updateMany: (
    filter?: QueryFilter,
    update?: UpdateQuery,
    insertNew?: boolean,
  ) => Promise<number>;

  clear: () => Promise<void>;
}

export interface IHandler {
  execute(
    req: ClimbingRequest,
    res: ClimbingResponse,
  ): Promise<void>;
}

export type ClimbingRequest = VercelRequest | Request;

export type ClimbingResponse = VercelResponse | Response;
