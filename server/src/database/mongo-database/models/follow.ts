// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  user: {
    type: String,
    required: true,
  },
  following: {
    type: String,
    required: true,
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const FollowModel = model('Follow', schema);
