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
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 0,
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const ReviewModel = model('Review', schema);
