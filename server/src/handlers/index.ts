// Local Exports
import { Handler } from './handler';
import BlockchainHandlers from './blockchain';
import ContractHandlers from './contract';
import CreatorHandlers from './creator';
import EarningsHandlers from './earnings';
import GameHandlers from './game';
import GameplayScreenshotHandlers from './gameplay-screenshot';
import GenreHandlers from './genre';
import NFTHandlers from './nft';
import PlatformHandlers from './platform';
import TokenHandlers from './token';
import VideoHandlers from './video';

/**
 * Dynamically loaded handlers separated by object.
 */
export default {
  blockchain: BlockchainHandlers,
  contract: ContractHandlers,
  creator: CreatorHandlers,
  earnings: EarningsHandlers,
  game: GameHandlers,
  'gameplay-screenshot': GameplayScreenshotHandlers,
  genre: GenreHandlers,
  nft: NFTHandlers,
  platform: PlatformHandlers,
  token: TokenHandlers,
  video: VideoHandlers,
} as Record<string, Record<string, Handler>>;
