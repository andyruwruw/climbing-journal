// Packages
import { Model } from 'mongoose';

// Local Imports
import { SessionModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Session as SessionInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Sessions.
 */
export class Session
  extends DataAccessObject<SessionInterface>
  implements DataAccessObjectInterface<SessionInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return SessionModel;
  }
}
