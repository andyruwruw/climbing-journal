// Packages
import { Model } from 'mongoose';

// Local Imports
import { UserModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  User as UserInterface,
  DataAccessObject as DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Users.
 */
export class User
  extends DataAccessObject<UserInterface>
  implements DataAccessObjectInterface<UserInterface> {
  /**
   * Creates a User in the Database.
   *
   * @param {string} name The name of the user.
   * @param {string} username The username of the user.
   * @param {string} password The password of the user.
   * @param {Date} started The date the user started climbing.
   * @param {number} height The height of the user.
   * @param {number} span The span of the user.
   * @param {number} weight The weight of the user.
   * @param {string} image URL to user image.
   * @returns {UserInterface} The user created.
   */
  async create(
    name: string,
    username: string,
    password: string,
    started: Date,
    height = -1,
    span = -100,
    weight = -1,
    image = '',
  ): Promise<UserInterface> {
    return this._create({
      name,
      username,
      password,
      started,
      height,
      weight,
      span,
      image,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return UserModel;
  }
}
