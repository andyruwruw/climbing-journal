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
  altNames: {
    type: Array,
    of: String,
    default: [],
  },
  parent: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    required: true,
  },
  type: {
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

export const AreaModel = model('Area', schema);
