// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  outdoors: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    default: 'CA',
  },
  address: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '',
  },
  href: {
    type: Object,
    default: {},
  },
  media: {
    type: [Object],
    default: [],
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
  submitted: {
    type: String,
    required: true,
  },
});

export const LocationModel = model('Location', schema);
