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
  location: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: '',
  },
  data: {
    type: String,
    default: '',
  },
  created: {
    type: Date,
    required: Date.now,
  },
});

export const MedalModel = model('Medal', schema);
