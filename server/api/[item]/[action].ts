// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';

// Local Imports
import ROUTES from '../../src/handlers';
import { handleCors } from '../../src/helpers/cors';

/**
 * Routes all incoming Vercel Serverless Function requests to the appropriate endpoint.
 *
 * @param {VercelRequest} req Incoming request.
 * @param {VercelResponse} res Outgoing response.
 */
export default async function (
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  /**
   * ID of endpoint.
   */
  const {
    item,
    action,
  } = req.query;

  /**
   * Deal with pesky cors.
   */
  handleCors(
    req,
    res,
  );

  /**
   * Execute function.
   */
  await ROUTES[item as string][action as string].execute(
    req,
    res,
  );
}
