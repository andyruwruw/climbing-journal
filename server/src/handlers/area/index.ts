// Local Imports
import { Handler } from '../handler';
import { CreateAreaHandler } from './create-area';
import { DeleteAreaHandler } from './delete-area';
import { EditAreaHandler } from './edit-area';
import { GetAreaHandler } from './get-area';
import { GetAreasHandler } from './get-areas';

export default {
  create: CreateAreaHandler,
  delete: DeleteAreaHandler,
  edit: EditAreaHandler,
  get: GetAreaHandler,
  gets: GetAreasHandler
} as Record<string, typeof Handler>;
