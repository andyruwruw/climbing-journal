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
    default: Date.now(),
  },
  route: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'interested',
  },
  notes: {
    type: String,
    default: '',
  },
});

export const InterestModel = model('Interest', schema);
