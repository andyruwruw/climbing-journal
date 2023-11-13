// Packages
import { Model } from 'mongoose';

// Local Imports
import { PostModel } from '../models';
import { DataAccessObject } from './dao';

// Types
import {
  Post as PostInterface,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Data access object for Posts.
 */
export class Post
  extends DataAccessObject<PostInterface>
  implements DataAccessObjectInterface<PostInterface> {
  /**
   * Retrieves mongoose Model for DataAccessObject.
   */
  _getModel(): Model<any, Record<string, any>, Record<string, any>, Record<string, any>> {
    return PostModel;
  }
}
