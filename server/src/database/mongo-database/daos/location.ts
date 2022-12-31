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
   * @param {string} name The name of the location.
   * @param {string} locale The local of the location.
   * @param {string} address The address of the location.
   * @param {boolean} [outdoors = false] Whether the location is outdoors.
   * @param {string} [image = ''] The image for the location.
   * @returns {LocationInterface} The location created.
   */
  async create(
    name: string,
    locale: string,
    address: string,
    outdoors: boolean = false,
    image: string = '',
  ): Promise<LocationInterface> {
    return this._create({
      name,
      locale,
      address,
      outdoors,
      image,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return LocationModel;
  }
}
