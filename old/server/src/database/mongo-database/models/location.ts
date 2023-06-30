// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    default: 'Climbing Location',
  },
  location: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  outdoors: {
    type: Boolean,
    default: false,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: '',
  },
});

export const LocationModel = model('Location', schema);
