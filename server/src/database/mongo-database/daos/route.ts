// Packages
import { Model } from 'mongoose';

// Local Imports
import { RouteModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Route as RouteInterface,
  DataAccessObject as DataAccessObjectInterface,
  RouteType,
} from '../../../types';

/**
 * Data access object for Routes.
 */
export class Route
  extends DataAccessObject<RouteInterface>
  implements DataAccessObjectInterface<RouteInterface> {
  /**
   * Creates a Route in the Database.
   *
   * @returns {RouteInterface} The Route created.
   */
  async create(
    name: string,
    type: RouteType,
    location: string,
    state: string,
    area: string,
    wall: string,
    href: Record<string, string> = {},
    grade: number,
    subgrade: number,
    danger: number,
    rated: number,
    updated: Date,
  ): Promise<RouteInterface> {
    return this._create({
      name,
      type,
      location,
      state,
      area,
      wall,
      href,
      grade,
      subgrade,
      danger,
      rated,
      updated,
    });
  }

  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return RouteModel;
  }
}
