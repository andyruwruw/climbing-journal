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

  token: {
    type: String,
    required: true,
  },

  created: {
    type: Date,
    default: Date.now,
  },
});

export const TokenModel = model('Token', schema);
