// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  Medal as MedalInterface,
  DataAccessObject as DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Medals.
 */
export class Medal
  extends DataAccessObject<MedalInterface>
  implements DataAccessObjectInterface<MedalInterface> {
  /**
   * Creates a Medal in the Database.
   *
   * @param {string} user The user who recieved the medal.
   * @param {string} location The location of the medal.
   * @param {string} type The type of the medal.
   * @param {string} data The data of the medal.
   * @returns {MedalInterface} The medal created.
   */
  async create(
    user: string,
    location: string,
    type: string,
    data: string,
  ): Promise<MedalInterface> {
    return this._create({
      user,
      location,
      type,
      data,
    });
  }
}
