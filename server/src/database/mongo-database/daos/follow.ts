// Packages
import { Model } from 'mongoose';

// Local Imports
import { FollowModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Follow as FollowInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Follows.
 */
export class Follow
  extends DataAccessObject<FollowInterface>
  implements DataAccessObjectInterface<FollowInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return FollowModel;
  }
}
