// Packages
import { Model } from 'mongoose';

// Local Imports
import { MedalModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Medal as MedalInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Medals.
 */
export class Medal
  extends DataAccessObject<MedalInterface>
  implements DataAccessObjectInterface<MedalInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return MedalModel;
  }
}
