// Packages
import { Model } from 'mongoose';

// Local Imports
import { UserModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  PrivateUser as UserInterface,
  DataAccessObject as DataAccessObjectInterface,
  UserPrivacy,
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
   * @returns {UserInterface} The User created.
   */
  async create(
    name: string,
    username: string,
    password: string,
    admin = false,
    started =  new Date(0),
    height = 0,
    span = -100,
    weight = 0,
    created = new Date(),
    image = '',
    privacy: UserPrivacy = 'unlisted',
  ): Promise<UserInterface> {
    return this._create({
      name,
      username,
      password,
      admin,
      started,
      height,
      span,
      weight,
      created,
      image,
      privacy,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return UserModel;
  }
}
