// Local Exports
import { Handler } from './handler';
import AuthenticatonHandlers from './authentication';
import GeneralHandlers from './general';
import LocationHandlers from './location';
import SessionHandlers from './session';
import UserHandlers from './user';

/**
 * Dynamically loaded handlers separated by object.
 */
export default {
  authentication: AuthenticatonHandlers,
  general: GeneralHandlers,
  location: LocationHandlers,
  session: SessionHandlers,
  user: UserHandlers,
} as Record<string, Record<string, typeof Handler>>;
