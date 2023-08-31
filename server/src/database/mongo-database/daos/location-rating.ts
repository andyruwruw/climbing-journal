// Packages
import { Model } from 'mongoose';

// Local Imports
import { LocationRatingModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  LocationRating as LocationRatingInterface,
  DataAccessObject as DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for LocationRatings.
 */
export class LocationRating
  extends DataAccessObject<LocationRatingInterface>
  implements DataAccessObjectInterface<LocationRatingInterface> {
  /**
   * Creates a LocationRating in the Database.
   *
   * @returns {LocationRatingInterface} The LocationRating created.
   */
  async create(
    user: string,
    location: string,
    notes: string,
    rating: number,
    updated: Date,
  ): Promise<LocationRatingInterface> {
    return this._create({
      user,
      location,
      notes,
      rating,
      updated,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return LocationRatingModel;
  }
}
