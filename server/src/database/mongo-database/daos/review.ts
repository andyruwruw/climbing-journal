// Packages
import { Model } from 'mongoose';

// Local Imports
import { ReviewModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Review as ReviewInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Reviews.
 */
export class Review
  extends DataAccessObject<ReviewInterface>
  implements DataAccessObjectInterface<ReviewInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return ReviewModel;
  }
}
