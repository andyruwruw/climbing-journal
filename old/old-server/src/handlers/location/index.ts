// Local Imports
import { Handler } from '../handler';
import { CreateLocationHandler } from './create-location';
import { DeleteLocationHandler } from './delete-location';
import { EditLocationHandler } from './edit-location';
import { GetLocationHandler } from './get-location';
import { GetLocationRatingsHandler } from './get-location-ratings';
import { RateLocationHandler } from './rate-location';

export default {
  create: CreateLocationHandler,
  delete: DeleteLocationHandler,
  edit: EditLocationHandler,
  get: GetLocationHandler,
  'get-location-ratings': GetLocationRatingsHandler,
  'rate-location': RateLocationHandler,
} as Record<string, typeof Handler>;
