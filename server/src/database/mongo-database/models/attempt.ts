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
    required: true,
  },
  status: {
    type: String,
    default: 'attempt',
  },
  notes: {
    type: String,
    default: '',
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
  media: {
    type: [Object],
    default: [],
  },
});

export const AttemptModel = model('Attempt', schema);
