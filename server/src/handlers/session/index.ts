// Local Imports
import { Handler } from '../handler';
import { CreateSessionHandler } from './create-session';
import { DeleteSessionHandler } from './delete-session';
import { EditSessionHandler } from './edit-session';
import { GetUserSessionsHandler } from './get-user-sessions';

export default {
  create: CreateSessionHandler,
  delete: DeleteSessionHandler,
  edit: EditSessionHandler,
  'get-user-sessions': GetUserSessionsHandler,
} as Record<string, typeof Handler>;
