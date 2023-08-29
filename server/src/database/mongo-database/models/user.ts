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
  username: {
    type: String,
    required: true,
  },
  started: {
    type: Date,
    default: new Date(0),
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
  created: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
  },
  updated: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: '',
  },
  privacy: {
    type: String,
    default: 'unlisted',
  },
  admin: {
    type: Boolean,
    default: false,
  },
});

export const UserModel = model('User', schema);
