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
  console.log(req.method);
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

  if (req.method === 'OPTIONS') {
    res.send(200);
  }

  // Instantiate handler.
  const handler = await (new ROUTES[item as string][action as string]());

  /**
   * Execute function.
   */
  await handler.execute(
    req,
    res,
  );
}
