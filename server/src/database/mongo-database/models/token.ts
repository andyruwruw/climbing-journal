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
  created: {
    type: Number,
    default: Date.now(),
  },
  token: {
    type: String,
    required: true,
  },
});

export const TokenModel = model('Token', schema);
