// Packages
import bcrypt from 'bcrypt';

// Local Imports
import {
  decodeToken,
  getCookie,
} from './cookie';
import { Database } from '../database/database';
import { SALT_WORK_FACTOR } from '../config';

// Types
import {
  PublicUser,
  User,
  ClimbingRequest,
} from '../types';

/**
 * Salts and hashes passwords.
 *
 * @param {string} password Password to be salted and hashed.
 * @returns {Promise<string>} Hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

  return bcrypt.hash(
    password,
    salt,
  );
};

/**
 * Validates an incoming password against a vaild password.
 *
 * @param {string} valid Stored password.
 * @param {string} subject Password to test.
 * @returns {Promise<boolean>} Whether the passwords match.
 */
export const comparePassword = async (
  valid: string,
  subject: string,
): Promise<boolean> => {
  return bcrypt.compare(
    subject,
    valid,
  );
};

/**
 * Validates a request and returns user.
 *
 * @param {ClimbingRequest} req Incoming request.
 * @param {Database} database Database instance.
 * @returns {Promise<User | null>} User if valid, null otherwise.
 */
export const validate = async (
  req: ClimbingRequest,
  database: Database,
): Promise<User | null> => {
  const cookie = getCookie(req);

  if (!cookie || cookie === '') {
    return null;
  }

  const token = decodeToken(cookie);

  const {
    id,
  } = token;

  if (!id || id === '') {
    return null;
  }

  if ((await database.token.find({
    user: id,
    token: cookie,
  })).length == 0) {
    return null;
  }

  return await database.user.findById(id);
};

/**
 * Converts a private user object to a public.
 *
 * @param {User | null} user Private user object.
 * @returns {PublicUser | null} Public user object.
 */
export const convertUserToPublic = (user: User | null): PublicUser | null => {
  if (!user) {
    return null;
  }

  return {
    name: user.name,
    username: user.username,
    started: user.started,
    height: user.height,
    span: user.span,
    weight: user.weight,
    created: user.created,
    image: user.image,
  };
};
