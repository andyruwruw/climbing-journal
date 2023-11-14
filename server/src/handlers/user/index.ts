// Local Imports
import { Handler } from '../handler';
import { DeleteUserHandler } from './delete-user';
import { EditUserHandler } from './edit-user';
import { FollowUserHandler } from './follow-user';
import { GetUserHandler } from './get-user';
import { UnfollowUserHandler } from './unfollow-user';

export default {
  delete: DeleteUserHandler,
  edit: EditUserHandler,
  follow: FollowUserHandler,
  get: GetUserHandler,
  unfolllow: UnfollowUserHandler,
} as Record<string, typeof Handler>;
