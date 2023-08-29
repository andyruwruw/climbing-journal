// Packages
import { Model } from 'mongoose';

// Local Imports
import { MedalModel } from '../models';
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

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return MedalModel;
  }
}
