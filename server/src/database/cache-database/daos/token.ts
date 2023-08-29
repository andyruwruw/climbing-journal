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
   * @returns {TokenInterface} The Token created.
   */
  async create(
    user: string,
    token: string,
    created = new Date(),
  ): Promise<TokenInterface> {
    return this._create({
      user,
      token,
      created,
    });
  }
}
