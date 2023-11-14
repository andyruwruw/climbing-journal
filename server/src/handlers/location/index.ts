// Local Imports
import { Handler } from '../handler';
import { CreateLocationHandler } from './create-location';
import { CreateLocationReviewHandler } from './create-location-review';
import { DeleteLocationHandler } from './delete-location';
import { DeleteLocationReviewHandler } from './delete-location-review';
import { EditLocationHandler } from './edit-location';
import { EditLocationReviewHandler } from './edit-location-review';
import { GetLocationHandler } from './get-location';
import { GetLocationReviewsHandler } from './get-location-reviews';
import { GetLocationRoutesHandler } from './get-location-routes';
import { GetLocationsHandler } from './get-locations';

export default {
  review: CreateLocationReviewHandler,
  create: CreateLocationHandler,
  unreview: DeleteLocationReviewHandler,
  delete: DeleteLocationHandler,
  rereview: EditLocationReviewHandler,
  edit: EditLocationHandler,
  reviews: GetLocationReviewsHandler,
  routes: GetLocationRoutesHandler,
  get: GetLocationHandler,
  gets: GetLocationsHandler,
} as Record<string, typeof Handler>;
