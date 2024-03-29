// Packages
import { Model } from 'mongoose';

// Local Imports
import { LocationModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Location as LocationInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Locations.
 */
export class Location
  extends DataAccessObject<LocationInterface>
  implements DataAccessObjectInterface<LocationInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return LocationModel;
  }
}
