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
  User,
  ClimbingRequest,
  PublicUser,
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

  console.log(cookie);

  if (!cookie || cookie === '') {
    return null;
  }

  const token = decodeToken(cookie);

  const {
    user,
  } = token;

  if (!user || user === '') {
    return null;
  }

  if ((await database.token.find({
    user,
    token: cookie,
  })).length == 0) {
    return null;
  }

  return await database.user.findOne({
    username: user,
  });
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
    displayName: user.displayName,
    username: user.username,
    max: user.max,
    image: user.image,
    started: user.started,
    home: user.home,
    height: user.height,
    span: user.span,
    weight: user.weight,
    age: user.age,
    href: user.href,
  };
};
