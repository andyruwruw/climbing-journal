// Local Exports
import { Handler } from './handler';
import AreaHandlers from './area';
import AttemptHandlers from './attempt';
import AuthenticatonHandlers from './authentication';
import GeneralHandlers from './general';
import InterestHandlers from './interest';
import LocationHandlers from './location';
import RouteHandlers from './route';
import SessionHandlers from './session';
import ShoesHandlers from './shoes';
import UserHandlers from './user';

/**
 * Dynamically loaded handlers separated by object.
 */
export default {
  area: AreaHandlers,
  attempt: AttemptHandlers,
  authentication: AuthenticatonHandlers,
  general: GeneralHandlers,
  interest: InterestHandlers,
  location: LocationHandlers,
  route: RouteHandlers,
  session: SessionHandlers,
  shoes: ShoesHandlers,
  user: UserHandlers,
} as Record<string, Record<string, typeof Handler>>;
