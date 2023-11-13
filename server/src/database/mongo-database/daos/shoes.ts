// Packages
import { Model } from 'mongoose';

// Local Imports
import { ShoesModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Shoes as ShoesInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Shoess.
 */
export class Shoes
  extends DataAccessObject<ShoesInterface>
  implements DataAccessObjectInterface<ShoesInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return ShoesModel;
  }
}
