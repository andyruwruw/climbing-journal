// Packages
import { Model } from 'mongoose';

// Local Imports
import { AttemptModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Attempt as AttemptInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Attempts.
 */
export class Attempt
  extends DataAccessObject<AttemptInterface>
  implements DataAccessObjectInterface<AttemptInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return AttemptModel;
  }
}
