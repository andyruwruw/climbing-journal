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
  type: {
    type: String,
    default: '',
  },
  data: {
    type: String,
    default: '{}',
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const MedalModel = model('Medal', schema);
