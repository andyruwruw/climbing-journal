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
  route: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  images: {
    type: Array,
    of: String,
    default: [],
  },
  videos: {
    type: Array,
    of: String,
    default: [],
  },
  status: {
    type: String,
    default: 'unknown',
  },
  attempts: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: '',
  },
  felt: {
    type: Number,
    default: -1,
  },
  rating: {
    type: Number,
    default: -1,
  },
});

export const LogModel = model('Log', schema);
