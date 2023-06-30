// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: Schema.Types.ObjectId,
    ref: 'Location',
    required: true,
  },
  notes: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    default: 10,
  },
});

export const LocationRatingModel = model('LocationRating', schema);
