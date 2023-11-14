// Local Imports
import { Handler } from '../handler';
import { DeleteAttemptHandler } from './delete-attempt';
import { EditAttemptHandler } from './edit-attempt';
import { GetAttemptHandler } from './get-attempt';
import { GetAttemptsHandler } from './get-attempts';
import { LogAttemptHandler } from './log-attempt';

export default {
  delete: DeleteAttemptHandler,
  edit: EditAttemptHandler,
  get: GetAttemptHandler,
  gets: GetAttemptsHandler,
  log: LogAttemptHandler
} as Record<string, typeof Handler>;
