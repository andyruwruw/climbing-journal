// Packages
import { Model } from 'mongoose';

// Local Imports
import { InterestModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Interest as InterestInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Interests.
 */
export class Interest
  extends DataAccessObject<InterestInterface>
  implements DataAccessObjectInterface<InterestInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return InterestModel;
  }
}
