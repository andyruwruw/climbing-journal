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
  type: {
    type: String,
    default: 'boulder',
  },
  multiPitch: {
    type: Boolean,
    default: false,
  },
  location: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: 'CA',
  },
  area: {
    type: String,
    default: '',
  },
  href: {
    type: Object,
    default: {},
  },
  grade: {
    type: Number,
    default: -1,
  },
  subGrade: {
    type: Number,
    default: 0,
  },
  danger: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Object,
    default: {},
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
  submitted: {
    type: String,
    required: true,
  },
  media: {
    type: [Object],
    default: [],
  },
});

export const RouteModel = model('Route', schema);
