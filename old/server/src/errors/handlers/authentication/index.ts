// Local Imports
import { Handler } from '../handler';
import { CheckUserHandler } from './check-user';
import { LoginHandler } from './login';
import { LogoutHandler } from './logout';
import { RegisterHandler } from './register';

export default {
  'check-user': CheckUserHandler,
  login: LoginHandler,
  logout: LogoutHandler,
  register: RegisterHandler,
} as Record<string, typeof Handler>;
