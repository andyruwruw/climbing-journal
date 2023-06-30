// Local Imports
import { Handler } from '../handler';
import { FollowUserHandler } from './follow-user';
import { GetUserFollowersHandler } from './get-user-followers';
import { GetUserFollowingsHandler } from './get-user-followings';
import { GetUserMedalsHandler } from './get-user-medals';
import { GetUserHandler } from './get-user';
import { UnfollowUserHandler } from './unfollow-user';
import { UpdateUserHandler } from './update-user';

export default {
  follow: FollowUserHandler,
  'get-followers': GetUserFollowersHandler,
  'get-followings': GetUserFollowingsHandler,
  'get-medals': GetUserMedalsHandler,
  get: GetUserHandler,
  unfollow: UnfollowUserHandler,
  update: UpdateUserHandler,
} as Record<string, typeof Handler>;
