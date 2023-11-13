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

  website?: string;

  eightA?: string;

  sendage?: string;
}

type MediaType = 'image' | 'video' | 'link';

interface Media {
  type: MediaType;

  href: string;

  caption: string;

  date: number;
}

type AttemptState = 'attempt' | 'top-roped' | 'lead' | 'trad' | 'hung' | 'flash' | 'send' | 'day-flash' | 'onsight' | 'ice' | 'project' | 'touch' | 'unknown';

interface Attempt extends DatabaseItem {
  user: string;

  date: number;

  route: string;

  status: AttemptState;

  notes: string;

  updated: number;

  media: Media[];
}

interface Follow {
  user: string;

  following: string;

  updated: number;
}

type InterestStatue = 'project' | 'visit' | 'clean';

interface Interest extends DatabaseItem {
  user: string;

  date: number;

  route: string;

  status: InterestStatue;

  notes: string;
}

interface Location extends DatabaseItem {
  name: string;

  outdoors: boolean;

  state: string;

  address: string;

  color: string;

  href: ExternalHref;

  media: Media[];

  updated: number;
}

interface Medal extends DatabaseItem {
  user: string;

  type: string;

  data: string;

  updated: number;
}

interface Rating extends DatabaseItem {
  user: string;

  route: string;

  suggestedGrade: number;

  suggestedSubGrade: number;

  rating: number;

  status: AttemptState;

  updated: number;
}

interface Review extends DatabaseItem {
  user: string;

  location: string;

  rating: number;

  notes: string;

  updated: number;
}

interface Route extends DatabaseItem {
  type: string;

  multiPitch: boolean;

  location: string;

  state: string;

  area: string;

  subArea: string;

  href: ExternalHref;

  grade: number;

  subGrade: number;

  danger: number;

  rating: number;

  updated: number;

  media: Media[];
}

interface Session extends DatabaseItem {
  user: string;

  location: string;

  date: number;

  start: number;

  end: number;

  duration: number;

  subAreas: string[];

  state: string;
  
  bouldering: boolean;

  sport: boolean;

  trad: boolean;

  topRope: boolean;

  aid: boolean;

  ice: boolean;

  mixed: boolean;

  alpine: boolean;

  outdoor: boolean;

  felt: number;

  maxBoulder: number;

  maxBoulderSubGrade: number;

  maxSport: number;

  maxSportSubGrade: number;

  maxTrad: number;

  maxTradSubGrade: number;

  maxTopRope: number;

  maxTopRopeSubGrade: number;

  maxAid: number;

  maxAidSubGrade: number;

  maxIce: number;

  maxIceSubGrade: number;

  maxMixed: number;

  maxMixedSubGrade: number;

  maxAlpine: number;

  maxAlpineSubGrade: number;

  notes: string;

  partners: string[];

  media: Media[];

  updated: number;
}

type ShoesStatus = 'new' | 'used' | 'worn' | 'hole' | 'resoled' | 'retired';

interface Shoes extends DatabaseItem {
  user: string;

  date: number;

  brand: string;

  model: string;

  volume: string;

  sizeUS: number;

  sizeEUR: number;

  status: ShoesStatus;

  resoled: boolean;

  resoleDate: number;

  resoleRubber: string;

  notes: string;

  updated: number;
}

interface Token {
  user: string;

  token: string;

  created: number;
}

interface Post extends DatabaseItem {
  user: string;

  date: number;

  route: string;

  location: string;

  type: string;

  privacy: string;
}

type PrivacyStatus = 'public' | 'unlisted' | 'private';

interface User extends DatabaseItem {
  username: string;

  password: string;

  displayName: string;

  max: UserSends;

  email: string;

  image: string;

  admin: boolean;

  created: number;

  started: number;

  home: string;

  height: number;

  span: number;

  weight: number;

  age: string;

  privacy: PrivacyStatus;

  attemptPrivacy: PrivacyStatus;

  sessionPrivacy: PrivacyStatus;
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

type RouteType = 'boulder' | 'multi-pitch' | 'top-rope' | 'lead' | 'trad' | 'ice' | 'mixed' | 'aid' | 'other';
export interface DatabaseRow {
  /**
   * Database Unique Identifier.
   */
  _id?: string;
}

/**
 * Database column types.
 */
export type DatabaseColumnTypes = string | number | boolean | any[] | null | undefined;

export interface AdvancedQuery {
  $eq?: DatabaseColumnTypes;

  $gt?: DatabaseColumnTypes;

  $gte?: DatabaseColumnTypes;

  $in?: DatabaseColumnTypes[];

  $lt?: DatabaseColumnTypes;

  $lte?: DatabaseColumnTypes;

  $ne?: DatabaseColumnTypes;

  $nin?: DatabaseColumnTypes[];

  $not?: AdvancedQuery;

  $exists?: boolean;

  $type?: string | string[];

  $mod?: [number, number];

  $regex?: RegExp;

  $options?: string;

  $all?: DatabaseColumnTypes[];

  $elemMatch?: AdvancedQuery;

  $size?: number;
}

export interface JSONQuery {
  required?: string[];

  properties?: Dictionary<JSONQuery>;

  bsonType?: string;

  description?: string;
}

export interface TextQuery {
  $search: string;

  $language?: string;

  $caseSensitive?: boolean;

  $diacriticSensitive?: boolean;
}

/**
 * Object defining a query filter.
 */
export interface QueryConditions {
  [key: string]: DatabaseColumnTypes | AdvancedQuery;

  $and?: QueryConditions[];

  $nor?: QueryConditions[];

  $or?: QueryConditions[];

  $expr?: AdvancedQuery;

  $jsonSchema?: JSONQuery;

  $text?: TextQuery;

  $where?: () => boolean;
}

export interface AdvancedUpdate {
  $each?: DatabaseColumnTypes[];
}

/**
 * Object defining a query update.
 */
export interface QueryUpdate {
  [key: string]: DatabaseColumnTypes | AdvancedUpdate | QueryUpdate;

  $addToSet?: QueryUpdate;

  $pop?: QueryUpdate;

  $pull?: QueryUpdate;

  $push?: QueryUpdate;

  $sort?: QueryConditions;

  $inc?: QueryUpdate;

  $min?: QueryUpdate;

  $max?: QueryUpdate;

  $mul?: QueryUpdate;

  $setOnInsert?: QueryUpdate;
}

/**
 * Object defining how to sort results.
 */
export interface QuerySort {
  [key: string]: number;
}

/**
 * Update defining a query projection.
 */
export interface QueryProjection {
  [key: string]: boolean;
}

interface MariaDBQuery {
  namedPlaceholders: boolean;
  sql: string;
}

interface MariaDbParams {
  [key: string]: string | number | boolean | null;
}

export type MariaDbQuery = Array<IMariaDBQuery | IMariaDbParams>;

/**
 * SQL Column Types.
 */
export type SqlColumnTypes = `int(${number})` | 'bigint' | 'smallint' | `varchar(${number})` | `decimal(${number},${number})` | 'text' | 'boolean';

/**
 * Column values references to external tables.
 */
export interface ColumnReference {
  /**
   * Table linked.
   */
  table: string;
  
  /**
   * Key in the table it links to.
   */
  primaryKey: string;

  /**
   * Whether to delete this item if reference is destroyed.
   */
  deleteOnCascade: boolean;
}

/**
 * Advanced options for SQL columns.
 */
export interface ColumnOptions
  extends Record<string, (boolean | number | string | null | undefined | ColumnReference)> {
  /**
   * Whether the column can be null.
   */
  notNull: boolean;

  /**
   * Whether an int is signed or unsigned.
   */
  unsigned: boolean;

  /**
   * Default value.
   */
  default: number | string | boolean | null | undefined;

  /**
   * Whether this field is a primary key.
   */
  primaryKey: boolean;

  /**
   * Table this references to.
   */
  foreignKey: ColumnReference | null;

  /**
   * Whether to auto increment the value.
   */
  autoIncrement: boolean;
}

export interface MariaDbQueryTemplate {
  namedPlaceholders: true,
  sql: string;
}

export interface MariaDbQueryParameters {
  [key: string]: DatabaseColumnTypes;
}

export type MariaDbQuery = Array<MariaDbQueryTemplate | MariaDbQueryParameters>;

export type AnnotationType = 'interval' | 'single' | 'section' | 'random' | 'continuous';

/**
 * Basic data access object.
 */
export interface DataAccessObjectInterface<T> {
  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  clear: () => Promise<void>;

  /**
   * Not needed.
   */
  createTable: () => Promise<void>;

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  delete: (conditions: QueryConditions) => Promise<number>;

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  deleteById: (id: string) => Promise<boolean>;

  /**
   * Deletes all items from the Database.
   */
  deleteAll: () => Promise<void>;

  /**
   * Not needed.
   */
  dropTable: () => Promise<void>;

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  find: (
    conditions?: QueryConditions,
    projection?: QueryProjection,
    sort?: QuerySort,
    offset?: number,
    limit?: number,
  ) => Promise<T[]>;

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  findById: (id: string) => Promise<T | null>

  /**
   * Finds one item in the Database.
   *
   * @param {QueryConditions} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  findOne: (
    conditions: QueryConditions,
    projection?: QueryProjection,
  ) => Promise<T | null>;

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  insert: (item: T) => Promise<number>;

  /**
   * Pain.
   */
  query: (query: string | MariaDbQuery) => Promise<any>;

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  update: (
    conditions: QueryConditions,
    update: QueryUpdate,
  ) => Promise<number>;

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryConditions} filter
   * @param {QueryUpdate} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  updateMany: (
    filter: QueryConditions = {},
    update: QueryUpdate = {},
    insertNew = true,
  ) => Promise<number>;
}