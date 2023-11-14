// Local Imports
import { Handler } from '../handler';
import { DeleteInterestHandler } from './delete-interest';
import { EditInterestHandler } from './edit-interest';
import { GetInterestHandler } from './get-interest';
import { GetInterestsHandler } from './get-interests';
import { LogInterestHandler } from './log-interest';

export default {
  delete: DeleteInterestHandler,
  edit: EditInterestHandler,
  get: GetInterestHandler,
  gets: GetInterestsHandler,
  log: LogInterestHandler
} as Record<string, typeof Handler>;
