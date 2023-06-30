// Packages
import { Model } from 'mongoose';

// Local Imports
import { SessionModel } from '../models';
import { DataAccessObject } from './dao';
import { generateEmptyMaxSends } from '../../../config';

// Types
import {
  Session as SessionInterface,
  DataAccessObject as DataAccessObjectInterface,
  MaxSends,
  SessionFocus,
} from '../../../types';

/**
 * Data access object for Sessions.
 */
export class Session
  extends DataAccessObject<SessionInterface>
  implements DataAccessObjectInterface<SessionInterface> {
  /**
   * Creates a Session in the Database.
   *
   * @param {string} user The user who created the session.
   * @param {string} location The location of the session.
   * @param {Date} start The start time of the session.
   * @param {number} duration The duration of the session.
   * @param {string} notes The notes for the session.
   * @param {number} ability The ability of the user.
   * @param {number} felt The felt of the user.
   * @param {SessionFocus[]} focus The focus of the session.
   * @param {MaxSends} max The max sends of the session.
   * @param {string[]} images The images of the session.
   * @returns {SessionInterface} The session created.
   */
  async create(
    user: string,
    location: string,
    start: Date,
    duration: number,
    notes: string,
    ability: number,
    felt: number,
    focus: SessionFocus[] = [],
    max: MaxSends = generateEmptyMaxSends(),
    images: string[] = [],
  ): Promise<SessionInterface> {
    return this._create({
      user,
      location,
      start,
      duration,
      notes,
      ability,
      felt,
      focus,
      max,
      images,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return SessionModel;
  }
}
