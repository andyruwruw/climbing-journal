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
  type: {
    type: String,
    default: 'boulder',
  },
  location: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    default: '',
  },
  wall: {
    type: String,
    default: '',
  },
  href: {
    type: Object,
    default: {},
  },
  grade: {
    type: Number,
    default: -2,
  },
  subgrade: {
    type: Number,
    default: -2,
  },
  danger: {
    type: Number,
    default: 0,
  },
  rated: {
    type: Number,
    default: -1,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export const RouteModel = model('Route', schema);
