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
    required: '',
  },
  rating: {
    type: Number,
    default: -1,
  },
  updated: {
    type: Date,
    required: Date.now,
  },
});

export const LocationRatingModel = model('LocationRating', schema);
