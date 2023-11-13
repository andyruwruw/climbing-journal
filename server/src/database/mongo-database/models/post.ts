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
  date: {
    type: Number,
    default: Date.now(),
  },
  route: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: true,
  },
  privacy: {
    type: String,
    default: 'public',
  },
});

export const PostModel = model('Post', schema);
