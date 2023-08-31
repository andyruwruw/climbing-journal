// Packages
import { Model } from 'mongoose';

// Local Imports
import { LogModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Log as LogInterface,
  DataAccessObject as DataAccessObjectInterface,
  AttemptStatus,
} from '../../../types';

/**
 * Data access object for Logs.
 */
export class Log
  extends DataAccessObject<LogInterface>
  implements DataAccessObjectInterface<LogInterface> {
  /**
   * Creates a Log in the Database.
   *
   * @returns {LogInterface} The Log created.
   */
  async create(
    user: string,
    route: string,
    date = new Date(),
    images: string[] = [],
    videos: string[] = [],
    status: AttemptStatus = 'unknown',
    attempts = 1,
    notes = '',
    felt = -1,
    rating = -1,
  ): Promise<LogInterface> {
    return this._create({
      user,
      route,
      date,
      images,
      videos,
      status,
      attempts,
      notes,
      felt,
      rating,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return LogModel;
  }
}
