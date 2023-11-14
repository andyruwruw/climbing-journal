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
  suggestedGrade: {
    type: Number,
    default: -1,
  },
  suggestedSubGrade: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: '',
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const RatingModel = model('Rating', schema);
