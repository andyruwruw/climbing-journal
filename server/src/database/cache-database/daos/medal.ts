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
   * @returns {MedalInterface} The Medal created.
   */
  async create(
    user: string,
    location: string,
    type: string,
    data: string,
    created = new Date(),
  ): Promise<MedalInterface> {
    return this._create({
      user,
      location,
      type,
      data,
      created,
    });
  }
}
