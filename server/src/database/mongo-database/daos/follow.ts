// Packages
import { Model } from 'mongoose';

// Local Imports
import { FollowModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Follow as FollowInterface,
  DataAccessObject as DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Follows.
 */
export class Follow
  extends DataAccessObject<FollowInterface>
  implements DataAccessObjectInterface<FollowInterface> {
  /**
   * Creates a Follow in the Database.
   *
   * @param {string} user The user following someone else.
   * @param {string} following The user being followed.
   * @returns {FollowInterface} The follow created.
   */
  async create(
    user: string,
    following: string
  ): Promise<FollowInterface> {
    return this._create({
      user,
      following,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return FollowModel;
  }
}
