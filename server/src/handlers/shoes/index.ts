// Local Imports
import { Handler } from '../handler';
import { DeleteShoesHandler } from './delete-shoes';
import { EditShoesHandler } from './edit-shoes';
import { GetShoeLogsHandler } from './get-shoe-logs';
import { LogShoesHandler } from './log-shoes';

export default {
  delete: DeleteShoesHandler,
  edit: EditShoesHandler,
  get: GetShoeLogsHandler,
  log: LogShoesHandler,
} as Record<string, typeof Handler>;
