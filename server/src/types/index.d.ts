// Packages
import {
  Request,
  Response,
} from 'express';
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

interface DatabaseItem {
  _id?: string;
}

interface LocationRating extends DatabaseItem {
  user: UserReference;
  location: LocationReference;
  notes: string;
  rating: number;
}
type LocationRatingReference = string | LocationRating;

interface Location extends DatabaseItem {
  name: string;
  location: string;
  address: string;
  outdoors: boolean;
  image: string;
  updated?: Date;
}
type LocationReference = string | LocationRating;

interface Medal extends DatabaseItem {
  user: UserReference;
  location: LocationReference | null;
  type: string;
  data: string;
  created?: Date;
}
type MedalReference = string | MedalRating;

type SessionFocus = 'bouldering' | 'top-rope' | 'sport' | 'trad' | 'ice' | 'mixed' | 'training' | 'other';

type MaxSends = {
  boulder: number | null;
  topRope: number | null;
  sport: number | null;
  trad: number | null;
  speed: number | null;
  mixed: number | null;
  ice: number | null;
};

interface Session extends DatabaseItem {
  user: UserReference;
  location: LocationReference;
  start: Date;
  duration: number;
  notes?: string;
  ability: number;
  felt: number;
  focus: SessionFocus[];
  max: MaxSends;
  images: string[];
  updated?: Date;
}
type SessionReference = string | SessionRating;

interface Token extends DatabaseItem {
  user: UserReference;
  token: string;
  created?: Date;
}
type TokenReference = string | TokenRating;

interface PublicUser extends DatabaseItem {
  name: string;
  username: string;
  started: Date;
  height: number;
  span: number;
  weight: number;
  created?: Date;
}
interface User extends PublicUser {
  password: string;
  admin?: boolean;
  updated?: Date;
}
type UserReference = string | UserRating;

interface Follow extends DatabaseItem {
  user: UserReference;
  following: UserReference;
  created?: Date;
}
type FollowReference = string | FollowRating;


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

export type ClimbingRequest = VercelRequest | Request | MockedRequest;

export type ClimbingResponse = VercelResponse | Response | MockedResponse;
