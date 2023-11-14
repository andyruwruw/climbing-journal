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
  date: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  volume: {
    type: String,
    default: 'high',
  },
  sizeUS: {
    type: Number,
    default: -1,
  },
  sizeEU: {
    type: Number,
    default: -1,
  },
  acquired: {
    type: String,
    default: 'New',
  },
  status: {
    type: String,
    default: 'New',
  },
  resoled: {
    type: Boolean,
    default: false,
  },
  resoleDate: {
    type: Number,
    default: 0,
  },
  resoleRubber: {
    type: String,
    default: 'none',
  },
  notes: {
    type: String,
    default: '',
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
  shoesPrivacy: {
    type: String,
    default: 'private',
  },
});

export const ShoesModel = model('Shoes', schema);
