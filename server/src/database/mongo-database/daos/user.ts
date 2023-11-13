// Packages
import { Model } from 'mongoose';

// Local Imports
import { UserModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  User as UserInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Users.
 */
export class User
  extends DataAccessObject<UserInterface>
  implements DataAccessObjectInterface<UserInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return UserModel;
  }
}
