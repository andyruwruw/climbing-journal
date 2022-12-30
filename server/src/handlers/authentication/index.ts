// Local Imports
import { Handler } from '../handler';
import { LoginHandler } from './login';

export default {
  login: LoginHandler,
} as Record<string, typeof Handler>;
