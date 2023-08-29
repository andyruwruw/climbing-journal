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
  href: {
    type: Object,
    required: {},
  },
  indoors: {
    type: Boolean,
    default: false,
  },
  state: {
    type: String,
    required: true,
  },
});

export const LocationModel = model('Location', schema);
