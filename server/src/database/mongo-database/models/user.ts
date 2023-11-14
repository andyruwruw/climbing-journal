// Packages
import {
  model,
  Schema,
} from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  max: {
    type: Object,
    default: {},
  },
  email: {
    type: String,
    default: '',
  },
  image: {
    type: String,
    default: '',
  },
  admin: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Number,
    default: Date.now(),
  },
  started: {
    type: Number,
    default: 0,
  },
  home: {
    type: String,
    default: '',
  },
  height: {
    type: Number,
    default: 0,
  },
  span: {
    type: Number,
    default: -100,
  },
  weight: {
    type: Number,
    default: 0,
  },
  age: {
    type: Number,
    default: 0,
  },
  privacy: {
    type: String,
    default: 'public',
  },
  attemptPrivacy: {
    type: String,
    default: 'public',
  },
  sessionPrivacy: {
    type: String,
    default: 'public',
  },
  interestPrivacy: {
    type: String,
    default: 'public',
  },
  reviewPrivacy: {
    type: String,
    default: 'public',
  },
  shoesPrivacy: {
    type: String,
    default: 'private',
  },
  ratingPrivacy: {
    type: String,
    default: 'public',
  },
  href: {
    type: Object,
    default: {},
  },
});

export const UserModel = model('User', schema);
