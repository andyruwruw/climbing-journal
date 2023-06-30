// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  User as UserInterface,
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
   * @param {string} name The name of the user.
   * @param {string} username The username of the user.
   * @param {string} password The password of the user.
   * @param {Date} started The date the user started climbing.
   * @param {number} height The height of the user.
   * @param {number} span The span of the user.
   * @param {number} weight The weight of the user.
   * @param {string} image URL to user image.
   * @param {string} privacy User's privacy settings.
   * @returns {UserInterface} The user created.
   */
  async create(
    name: string,
    username: string,
    password: string,
    started: Date,
    height: number = -1,
    span: number = -100,
    weight: number = -1,
    image = '',
    privacy = 'public' as UserPrivacy,
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
      privacy,
    });
  }
}
