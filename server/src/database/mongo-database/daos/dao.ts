// Packages
import { Model } from 'mongoose';

// Local Imports
import { UsedAbstractDAOError } from '../../../errors/used-abstract-dao-error';

// Types
import {
  QueryFilter,
  QueryProjection,
  UpdateQuery,
} from '../../../types';

/**
 * Abstract class for Data Access Objects.
 */
export class DataAccessObject<T> {
  /**
   * Mongoose Model for DataAccessObject.
   */
  _model: Model<any, Record<string, any>, Record<string, any>, Record<string, any>>;

  /**
   * Instantiates a new DataAccessObject.
   */
  constructor() {
    this._model = this._getModel();
  }

  /**
   * Creates a new instance of the item in the Database.
   *
   * @param {T} options The item to create.
   * @returns {T} The created item.
   */
  async _create(options: T): Promise<T> {
    const item = new this._model(options);

    await item.save();

    return item.toObject() as unknown as T;
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
    return this._model.findOne(
      filter,
      projection,
    );
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
    return this._model.find(
      filter,
      projection,
    ).skip(offset).limit(limit);
  }

  /**
   * Finds an item by it's id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<T | null>} The item or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    return this._model.findById(id);
  }

  /**
   * Deletes all items or a subset of items from the Database.
   *
   * @param {QueryFilter} filter The filter to apply to the query.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(filter: QueryFilter = {}): Promise<number> {
    const {
      deletedCount,
    } = await this._model.deleteMany(filter);

    return deletedCount;
  }

  /**
   * Deletes a single item by its id from the Database.
   *
   * @param {string} id The id of the item.
   * @returns {Promise<boolean>} Whether the item was deleted.
   */
  async deleteById(id: string): Promise<boolean> {
    const {
      deletedCount,
    } = await this._model.deleteOne({ _id: id });

    return deletedCount === 1;
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
    const { modifiedCount } = await this._model.updateOne(
      filter,
      update,
      {
        upsert: insertNew,
      },
    );

    return modifiedCount > 0;
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
    const { modifiedCount } = await this._model.updateMany(
      filter,
      update,
      {
        upsert: insertNew,
      },
    );

    return modifiedCount;
  }

  /**
   * Clears all items from the table.
   *
   * @returns {Promise<void>} Promise of the action.
   */
  async clear(): Promise<void> {
    await this._model.deleteMany();
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   *
   * @returns {Model} The mongoose model.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    throw new UsedAbstractDAOError();
  }
}
