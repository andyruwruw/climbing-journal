// Packages
import { Model } from 'mongoose';

// Local Imports
import { AreaModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Area as AreaInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Areas.
 */
export class Area
  extends DataAccessObject<AreaInterface>
  implements DataAccessObjectInterface<AreaInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return AreaModel;
  }
}
