// Packages
import { Model } from 'mongoose';

// Local Imports
import { RouteModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Route as RouteInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Routes.
 */
export class Route
  extends DataAccessObject<RouteInterface>
  implements DataAccessObjectInterface<RouteInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return RouteModel;
  }
}
