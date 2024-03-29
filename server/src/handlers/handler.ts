/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { Database } from '../database/database';
import { Environment } from '../helpers/environment';
import { getDatabase } from '../database';
import { Monitor } from '../helpers/monitor';

// Types
import {
  ClimbingRequest,
  ClimbingResponse,
} from '../types';

/**
 * Abstract handler class.
 */
export class Handler {
  /**
   * Database instance.
   */
  static database: Database;

  /**
   * Whether the handler is ready to execute.
   */
  _ready = false;

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
    return;
  }

  /**
   * Connects to the database.
   */
  async connectDatabase(): Promise<void> {
    if (!Handler.database) {
      Handler.database = getDatabase(Environment.getDatabaseType());
    }

    try {
      if (!Handler.database.isConnected()) {
        await Handler.database.connect(
          Environment.getDatabaseUrl(),
          Environment.getDatabaseUser(),
          Environment.getDatabasePassword(),
        );

        Monitor.log(
          Handler,
          'Database connected.',
          Monitor.Layer.INFO,
        );
      }

      this._ready = true;
    } catch (error) {
      Monitor.trace(
        Handler,
        `Failed to connect to database: ${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
