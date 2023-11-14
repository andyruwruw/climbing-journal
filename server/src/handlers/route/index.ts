// Local Imports
import { Handler } from '../handler';
import { CreateRouteHandler } from './create-route';
import { DeleteRouteHandler } from './delete-route';
import { DeleteRouteRatingHandler } from './delete-route-rating';
import { EditRouteHandler } from './edit-route';
import { EditRouteRatingHandler } from './edit-route-rating';
import { GetRoutesHandler } from './get-route';
import { GetRouteRatingsHandler } from './get-route-ratings';
import { RateRouteHandler } from './rate-route';

export default {
  create: CreateRouteHandler,
  unrate: DeleteRouteRatingHandler,
  delete: DeleteRouteHandler,
  rerate: EditRouteRatingHandler,
  edit: EditRouteHandler,
  ratings: GetRouteRatingsHandler,
  get: GetRoutesHandler,
  gets: GetRoutesHandler,
  rate: RateRouteHandler
} as Record<string, typeof Handler>;
