// Packages
import { Model } from 'mongoose';

// Local Imports
import { TokenModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Token as TokenInterface,
  DataAccessObject as DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Tokens.
 */
export class Token
  extends DataAccessObject<TokenInterface>
  implements DataAccessObjectInterface<TokenInterface> {
  /**
   * Creates a Token in the Database.
   *
   * @param {string} user The user who created the token.
   * @param {string} token The token.
   * @returns {TokenInterface} The token created.
   */
  async create(
    user: string,
    token: string,
  ): Promise<TokenInterface> {
    return this._create({
      user,
      token
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return TokenModel;
  }
}
