// Local Imports
import { UsedAbstractDAOError } from '../errors/used-abstract-dao-error';

// Types
import {
  QueryFilter,
  QueryProjection,
  UpdateQuery,
} from '../types';

/**
 * Abstract class for Data Access Objects.
 */
export class DataAccessObject<T> {
  /**
   * Instantiates a new DataAccessObject.
   */
  constructor() {
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async _create(options: T): Promise<T> {
    return options;
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async create(options: T): Promise<T> {
    return options;
  }

  /**
   * Finds one item in the Database.
   *
   * @param {QueryFilter} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T | null>} The item.
   */
  async findOne(
    filter: QueryFilter = {},
    projection: QueryProjection = '',
  ): Promise<T | null> {
    return null;
  }

  /**
   * Finds all of the item in the Database.
   *
   * @param {QueryFilter} filter The filter to apply to the query.
   * @param {QueryProjection} projection The projection to apply to the query.
   * @returns {Promise<T[]>} The items.
   */
  async find(
    filter: QueryFilter = {},
    projection: QueryProjection = '',
    offset: number = 0,
    limit: number = 20,
  ): Promise<T[]> {
    return [];
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    return null;
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryFilter} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryFilter = {}): Promise<number> {
    return 0;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    return false;
  }

  /**
   * Updates one item in the Database matching the filter.
   *
   * @param {QueryFilter} filter
   * @param {UpdateQuery} update
   * @param {boolean} insertNew
   * @returns {Promise<boolean>} Whether the item was updated.
   */
  async updateOne(
    filter: QueryFilter = {},
    update: UpdateQuery = {},
    insertNew = true,
  ): Promise<boolean> {
    return false;
  }

  /**
   * Updates all items in the Database matching the filter.
   *
   * @param {QueryFilter} filter
   * @param {UpdateQuery} update
   * @param {boolean} insertNew
   * @returns {Promise<number>} The number of documents updated.
   */
  async updateMany(
    filter: QueryFilter = {},
    update: UpdateQuery = {},
    insertNew = true,
  ): Promise<number> {
    return 0;
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
  }
}
