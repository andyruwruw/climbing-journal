// Local Imports
import { DataAccessObject } from './dao';

// Types
import {
  Session as SessionInterface,
  DataAccessObject as DataAccessObjectInterface,
  UserSends,
  RouteType,
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
   * @returns {SessionInterface} The Session created.
   */
  async create(
    user: string,
    start: Date,
    end: Date,
    date = new Date(),
    duration: number,
    location: string,
    images: string[] = [],
    videos: string[] = [],
    state: string,
    indoors = false,
    max: UserSends = {},
    felt = -1,
    sends: UserSends = {},
    notes = '',
    focuses: RouteType[] = [],
  ): Promise<SessionInterface> {
    return this._create({
      user,
      start,
      end,
      date,
      duration,
      location,
      images,
      videos,
      state,
      indoors,
      max,
      felt,
      sends,
      notes,
      focuses,
    });
  }
}
