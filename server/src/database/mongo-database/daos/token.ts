// Packages
import { Model } from 'mongoose';

// Local Imports
import { TokenModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Token as TokenInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Tokens.
 */
export class Token
  extends DataAccessObject<TokenInterface>
  implements DataAccessObjectInterface<TokenInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return TokenModel;
  }
}
