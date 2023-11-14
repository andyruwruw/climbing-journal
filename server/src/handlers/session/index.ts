// Local Imports
import { Handler } from '../handler';
import { DeleteSessionHandler } from './delete-session';
import { EditSessionHandler } from './edit-session';
import { GetSessionHandler } from './get-session';
import { GetSessionsHandler } from './get-sessions';
import { LogSessionHandler } from './log-session';

export default {
  delete: DeleteSessionHandler,
  edit: EditSessionHandler,
  get: GetSessionHandler,
  gets: GetSessionsHandler,
  log: LogSessionHandler,
} as Record<string, typeof Handler>;
