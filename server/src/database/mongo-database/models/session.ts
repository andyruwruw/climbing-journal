// Packages
import { generateEmptyMaxSends } from '@/config';
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
  date: {
    type: Date,
    default: Date.now,
  },
  start: {
    type: Date,
    default: Date.now,
  },
  end: {
    type: Date,
    default: Date.now,
  },
  duration: {
    type: Number,
    default: 0,
  },
  areas: {
    type: [String],
    default: [],
  },
  state: {
    type: String,
    default: 'CA',
  },
  bouldering: {
    type: Boolean,
    default: false,
  },
  sport: {
    type: Boolean,
    default: false,
  },
  trad: {
    type: Boolean,
    default: false,
  },
  topRope: {
    type: Boolean,
    default: false,
  },
  aid: {
    type: Boolean,
    default: false,
  },
  ice: {
    type: Boolean,
    default: false,
  },
  mixed: {
    type: Boolean,
    default: false,
  },
  alpine: {
    type: Boolean,
    default: false,
  },
  outdoor: {
    type: Boolean,
    default: false,
  },
  felt: {
    type: Number,
    default: 5,
  },
  max: {
    type: Object,
    default: generateEmptyMaxSends(),
  },
  notes: {
    type: String,
    default: '',
  },
  partners: {
    type: [String],
    default: [],
  },
  media: {
    type: [Object],
    default: [],
  },
  updated: {
    type: Number,
    default: Date.now(),
  },
});

export const SessionModel = model('Session', schema);
