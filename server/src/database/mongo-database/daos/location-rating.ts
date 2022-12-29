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
 * Data access object for Location Ratings.
 */
export class LocationRating
  extends DataAccessObject<LocationRatingInterface>
  implements DataAccessObjectInterface<LocationRatingInterface> {
  /**
   * Creates a Location Rating in the Database.
   *
   * @param {string} user The user who created the rating.
   * @param {string} location The location being rated.
   * @param {string} [notes = ''] The notes for the rating.
   * @param {number} rating The rating.
   * @returns {LocationRatingInterface} The location rating created.
   */
  async create(
    user: string,
    location: string,
    rating: number,
    notes: string = '',
  ): Promise<LocationRatingInterface> {
    return this._create({
      user,
      location,
      notes,
      rating,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return LocationRatingModel;
  }
}
