// Local Imports
import {
  checkExists,
  validateImages,
  validateLinks,
} from '../../helpers/parameters';
import {
  MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR,
  MESSAGE_CREATE_HANDLER_FAIL,
  MESSAGE_CREATE_HANDLER_PARAMETER_MISSING,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../config/messages';
import { Handler as AbstractHandler } from '../handler';
import { Monitor } from '../../helpers/monitor';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../../types';

/**
 * Creates a new location.
 */
export class CreateLocationHandler extends AbstractHandler {
  /**
   * Handles the request.
   *
   * @param {ClimbingRequest} req Incoming request.
   * @param {ClimbingResponse} res Outgoing response.
   */
  async execute(
    req: ClimbingRequest,
    res: ClimbingResponse,
  ): Promise<void> {
    try {
      const {
        name,
        symbol,
        images = [] as string[],
        links = {} as Record<string, string>,
      } = req.body;

      // Are the required fields provided?
      if (!name) {
        return res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('blockchain', 'name'),
        });
      }
      if (!symbol) {
        return res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_PARAMETER_MISSING('blockchain', 'symbol'),
        });
      }

      // Are the images valid?
      const validatedImagesResult = validateImages(images);
      if (validatedImagesResult.length) {
        return res.status(400).send({
          error: validatedImagesResult,
        });
      }

      // Are the links valid?
      const validatedLinksResult = validateLinks(links);
      if (validatedLinksResult.length) {
        return res.status(400).send({
          error: validatedLinksResult,
        });
      }

      // Does the blockchain already exist?
      if (await checkExists(AbstractHandler.database.blockchain, {
        name,
      })) {
        return res.status(400).send({
          error: MESSAGE_CREATE_HANDLER_DUPLICATE_ENTRY_ERROR('Blockchain', 'name', name),
        });
      }

      // Create the new blockchain.
      const blockchain = await AbstractHandler.database.blockchain.create(
        name,
        symbol,
        images,
        links,
      );

      if (!blockchain) {
        Monitor.trace(
          CreateLocationHandler,
          MESSAGE_CREATE_HANDLER_FAIL('blockchain'),
          Monitor.Layer.WARNING,
        );

        return res.status(500).send({
          error: MESSAGE_INTERNAL_SERVER_ERROR,
        });
      }

      return res.status(201).send({
        blockchain,
      });
    } catch (error) {
      Monitor.trace(
        CreateLocationHandler,
        error,
        Monitor.Layer.WARNING,
      );

      return res.status(500).send({
        error: MESSAGE_INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export default new CreateLocationHandler();
