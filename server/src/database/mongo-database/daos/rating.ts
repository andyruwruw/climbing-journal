// Packages
import { Model } from 'mongoose';

// Local Imports
import { RatingModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Rating as RatingInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Ratings.
 */
export class Rating
  extends DataAccessObject<RatingInterface>
  implements DataAccessObjectInterface<RatingInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return RatingModel;
  }
}
