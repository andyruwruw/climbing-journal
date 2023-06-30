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
  start: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 0,
  },
  notes: {
    type: String,
    default: '',
  },
  ability: {
    type: Number,
    default: 10,
  },
  felt: {
    type: Number,
    default: 10,
  },
  focus: {
    type: Array,
    of: {
      type: String,
    },
  },
  max: {
    boulder: {
      type: Number,
      default: 0,
    },
    topRope: {
      type: Number,
      default: 0,
    },
    sport: {
      type: Number,
      default: 0,
    },
    trad: {
      type: Number,
      default: 0,
    },
    speed: {
      type: Number,
      default: 0,
    },
    mixed: {
      type: Number,
      default: 0,
    },
    ice: {
      type: Number,
      default: 0,
    },
  },
  images: {
    type: Array,
    of: {
      type: String,
    },
    default: [],
  },
  updated: {
    type: Date,
    default: Date.now,
  },
});

export const SessionModel = model('Session', schema);
