// Packages
import { Model } from 'mongoose';

// Local Imports
import { LocationModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Location as LocationInterface,
  DataAccessObject as DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Locations.
 */
export class Location
  extends DataAccessObject<LocationInterface>
  implements DataAccessObjectInterface<LocationInterface> {
  /**
   * Creates a Location in the Database.
   *
   * @returns {LocationInterface} The Location created.
   */
  async create(
    name: string,
    href: Record<string, string> = {},
    indoors = false,
    state = '',
  ): Promise<LocationInterface> {
    return this._create({
      name,
      href,
      indoors,
      state,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return LocationModel;
  }
}
