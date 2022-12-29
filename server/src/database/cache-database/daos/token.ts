// Local Imports
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
}
