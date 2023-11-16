// Types
import {
  AreaType,
  AttemptStatus,
  Dictionary,
  ExternalHref,
  InterestStatus,
  Media,
  MediaType,
  PrivacyStatus,
  QueryConditions,
  RouteType,
  ShoesStatus,
  User,
  UserSends,
} from '../types';

/**
 * Database type enum.
 */
export const DATABASE_TYPES = {
  MONGO: 'mongo',
  CACHE: 'cache',
};

/**
 * User privacy type enum.
 */
export const USER_PRIVACY = {
  UNLISTED: 'unlisted',
  PUBLIC: 'public',
  PRIVATE: 'private',
} as Dictionary<PrivacyStatus | string>;


/**
 * Route type enum.
 */
export const ROUTE_TYPE = {
  BOULDER: 'boulder',
  MULTI_PITCH: 'multi-pitch',
  TOP_ROPE: 'top-rope',
  LEAD: 'lead',
  TRAD: 'trad',
  ICE: 'ice',
  MIXED: 'mixed',
  AID: 'aid',
  OTHER: 'other',
} as Dictionary<RouteType | string>;

/**
 * User privacy type enum.
 */
export const INTEREST_STATUS = {
  PROJECT: 'project',
  VISIT: 'visit',
  CLEAN: 'clean',
} as Dictionary<InterestStatus | string>;

/**
 * Supported media types.
 */
export const MEDIA_TYPE = {
  IMAGE: 'image',
  YOUTUBE: 'youtube',
  INSTAGRAM: 'instagram',
  WEBSITE: 'website',
  DRIVE: 'drive',
} as Dictionary<MediaType>;

/**
 * Supported area types.
 */
export const AREA_TYPE = {
  AREA: 'area',
  BOULDER: 'boulder',
  WALL: 'wall',
} as Dictionary<AreaType | string>;

/**
 * Supported media types.
 */
export const ATTEMPT_STATUS = {
  ATTEMPT: 'attempt',
  TOP_ROPED: 'top-roped',
  LEAD: 'lead',
  TRAD: 'trad',
  HUNG: 'hung',
  FLASH: 'flash',
  SEND: 'send',
  DAY_FLASH: 'day-flash',
  ONSIGHT: 'onsight',
  ICE: 'ice',
  PROJECT: 'project',
  TOUCH: 'touch',
  UNKNOWN: 'unknown',
} as Dictionary<AttemptStatus | string>;

export const SHOE_STATUS = {
  NEW: 'new',
  USED: 'used',
  WORN: 'worn',
  HOLE: 'hole',
  RESOLED: 'resoled',
  RETIRED: 'retired',
};

export const SENT_ATTEMPT_STATUS = [
  ATTEMPT_STATUS.LEAD,
  ATTEMPT_STATUS.TRAD,
  ATTEMPT_STATUS.FLASH,
  ATTEMPT_STATUS.SEND,
  ATTEMPT_STATUS.DAY_FLASH,
  ATTEMPT_STATUS.ONSIGHT,
  ATTEMPT_STATUS.ICE,
];

export const ATTEMPT_ATTEMPT_STATUS = [
  ATTEMPT_STATUS.ATTEMPT,
  ATTEMPT_STATUS.TOP_ROPED,
  ATTEMPT_STATUS.HUNG,
  ATTEMPT_STATUS.PROJECT,
  ATTEMPT_STATUS.TOUCH,
  ATTEMPT_STATUS.UNKNOWN,
];

/**
 * Developmental URL for cors.
 */
export const DEVELOPMENT_URL = 'http://localhost:3000';

/**
 * Production URL for cors.
 */
export const PRODUCTION_URL = 'climbing-journal.vercel.app';

/**
 * Generates an empty max sends object.
 *
 * @returns {MaxSends} An empty MaxSends object.
 */
export const generateEmptyMaxSends = (): UserSends => ({
  indoorBoulder: -2,
  indoorBoulderFlash: -2,
  indoorTopRope: -2,
  indoorTopRopeFlash: -2,
  indoorTopRopeOnsight: -2,
  indoorLead: -2,
  indoorLeadFlash: -2,
  indoorLeadOnsight: -2,
  outdoorBoulder: -2,
  outdoorBoulderFlash: -2,
  outdoorTopRopeFlash: -2,
  outdoorTopRopeOnsight: -2,
  outdoorLead: -2,
  outdoorLeadFlash: -2,
  outdoorLeadOnsight: -2,
  outdoorTrad: -2,
  outdoorTradFlash: -2,
  outdoorTradOnsight: -2,
  outdoorIce: -2,
  outdoorAid: -2,
  outdoorMixed: -2,  
  indoorBoulderSubgrade: 0,
  indoorBoulderFlashSubgrade: 0,
  indoorTopRopeSubgrade: 0,
  indoorTopRopeFlashSubgrade: 0,
  indoorTopRopeOnsightSubgrade: 0,
  indoorLeadSubgrade: 0,
  indoorLeadFlashSubgrade: 0,
  indoorLeadOnsightSubgrade: 0,
  outdoorBoulderSubgrade: 0,
  outdoorBoulderFlashSubgrade: 0,
  outdoorTopRopeFlashSubgrade: 0,
  outdoorTopRopeOnsightSubgrade: 0,
  outdoorLeadSubgrade: 0,
  outdoorLeadFlashSubgrade: 0,
  outdoorLeadOnsightSubgrade: 0,
  outdoorTradSubgrade: 0,
  outdoorTradFlashSubgrade: 0,
  outdoorTradOnsightSubgrade: 0,
  outdoorIceSubgrade: 0,
  outdoorAidSubgrade: 0,
  outdoorMixedSubgrade: 0,
});

/**
 * Sanitizes a max sends object.
 *
 * @param {any} max Provided max sends object.
 * @returns {UserSends} Sanitized max sends object.
 */
export const sanitizeMaxSends = (max: any): UserSends => {
  const base = generateEmptyMaxSends();

  if (!max || typeof max !== 'object' || Object.keys(max).length === 0) {
    return base;
  }

  const keys = Object.keys(base);

  for (let i = 0; i < keys.length; i += 1) {
    if (keys[i] in max && typeof max[keys[i]] === 'number') {
      base[keys[i]] = max[keys[i]];
    }
  }

  return base;
};

/**
 * Sanitizes privacy status.
 *
 * @param {any} privacy Provided privacy status.
 * @returns {PrivacyStatus} Santized privacy status.
 */
export const sanitizePrivacy = (privacy: any): PrivacyStatus => (Object.values(USER_PRIVACY).includes(`${privacy}`) ? `${privacy}` as PrivacyStatus : USER_PRIVACY.PUBLIC as PrivacyStatus);

/**
 * Sanitizes attempt status.
 *
 * @param {any} status Provided attempt status.
 * @returns {AttemptStatus} Santized attempt status.
 */
export const sanitizeAttemptStatus = (status: any): AttemptStatus => (Object.values(ATTEMPT_STATUS).includes(`${status}`) ? `${status}` as AttemptStatus : ATTEMPT_STATUS.ATTEMPT as AttemptStatus);

/**
 * Sanitizes interest status.
 *
 * @param {any} status Provided interest status.
 * @returns {InterestStatus} Santized interest status.
 */
export const sanitizeInterestStatus = (status: any): InterestStatus => (Object.values(INTEREST_STATUS).includes(`${status}`) ? `${status}` as InterestStatus : INTEREST_STATUS.VISIT as InterestStatus);

/**
 * Sanitizes route type.
 *
 * @param {any} type Provided route type.
 * @returns {RouteType} Santized route type.
 */
export const sanitizeRouteType = (type: any): RouteType => (Object.values(ROUTE_TYPE).includes(`${type}`) ? `${type}` as RouteType : ROUTE_TYPE.BOULDER as RouteType);

/**
 * Sanitizes area type.
 *
 * @param {any} type Provided area type.
 * @returns {AreaType} Santized area type.
 */
export const sanitizeAreaType = (type: any): AreaType => (Object.values(AREA_TYPE).includes(`${type}`) ? `${type}` as AreaType : AREA_TYPE.AREA as AreaType);

/**
 * Sanitizes shoe status.
 *
 * @param {any} status Provided shoe status.
 * @returns {ShoesStatus} Santized shoe status.
 */
export const sanitizeShoesStatus = (status: any): ShoesStatus => (Object.values(SHOE_STATUS).includes(`${status}`) ? `${status}` as ShoesStatus : SHOE_STATUS.NEW as ShoesStatus);

/**
 * Sanitizes media objects.
 *
 * @param {any[]} media Provided media objects.
 * @returns {Media[]} Sanitized media objects. 
 */
export const sanitizeMedia = (media: any[]): Media[] => {
  const results = [] as Media[];

  for (let i = 0; i < media.length; i += 1) {
    if (('type' in media[i] && typeof media[i].type === 'string' && Object.values(MEDIA_TYPE).includes(media[i].type))
      && ('href' in media[i] && typeof media[i].href === 'string')) {
      const data = {
        type: media[i].type,
        href: media[i].href,
      } as Media;
      
      if ('caption' in media[i] && typeof media[i].caption === 'string') {
        data.caption = limitString(
          media[i].caption,
          1000,
        );
      }
      if ('date' in media[i]) {
        if (typeof media[i].date === 'number') {
          data.date = media[i].date;
        } else if (typeof media[i].date === 'string' && IS_NUMBER.test(media[i].date)) {
          data.date = parseInt(
            media[i].date,
            10,
          );
        }
      }

      results.push(data);
    }
  }

  return results;
}

/**
 * Limits string size.
 *
 * @param {any} text Text provided.
 * @param {number} limit Size to limit.
 * @returns {string} Limited string.
 */
export const limitString = (
  text: any,
  limit = 5000,
) => {
  if (typeof text !== 'string') {
    return '';
  }
  if (text.length > limit) {
    return text.substring(0, limit);
  }

  return `${text}`;
}

/**
 * Limits string arrays.
 *
 * @param {any} items Items provided.
 * @param {number} limit Size to limit.
 * @returns {string[]} Limited string array.
 */
export const limitStringArray = (
  items: any,
  limit = 5000,
) => {
  const converted = [];

  if (items instanceof Array) {
    for (let i = 0; i < items.length && i < 100; i += 1) {
      converted.push(limitString(items[i], limit));
    }
  } else if (typeof items === 'string') {
    const split = items.split(';');

    for (let i = 0; i < split.length && i < 100; i += 1) {
      converted.push(limitString(split[i], limit));
    }
  }

  return converted;
}

/**
 * Salting rounds.
 */
export const SALT_WORK_FACTOR = 12;

/**
 * Name of the login cookie.
 */
export const COOKIE_NAME = 'climb-cookie';

/**
 * Regex for checking string numbers.
 */
export const IS_NUMBER = /^[0-9]+$/;

/**
 * Adds user to query if not admin.
 *
 * @param {QueryConditions} query Query provided.
 * @param {User} user User making query. 
 * @returns {QueryConditions} Query with user added if not admin.
 */
export const overrideAdminQuery = (
  query: QueryConditions,
  user: User,
  field = 'user',
) => {
  const newQuery = { ...query };
  if (!user.admin) {
    newQuery[field] = user.username;
  }

  return newQuery;
}

/**
 * Sanitizes a location's href object.
 *
 * @param {any} href Provided href object.
 * @returns {ExternalHref} Sanitized href object. 
 */
export const sanitizeLocationHref = (href: any): ExternalHref => {
  const LOCATION_HREF_KEYS = [
    'moutainProject',
    'googleMaps',
    'website',
    'sendage',
    'eightA',
    'coordinates',
    'appleMaps',
  ];
  const results = {} as ExternalHref;

  for (let i = 0; i < LOCATION_HREF_KEYS.length; i += 1) {
    if (LOCATION_HREF_KEYS[i] in href && typeof href[LOCATION_HREF_KEYS[i]] === 'string') {
      results[LOCATION_HREF_KEYS[i]] = limitString(href[LOCATION_HREF_KEYS[i]], 10000);
    }
  }

  return results;
}

/**
 * Sanitizes a route's href object.
 *
 * @param {any} href Provided href object.
 * @returns {ExternalHref} Sanitized href object. 
 */
export const sanitizeRouteHref = (href: any): ExternalHref => {
  const ROUTE_HREF_KEYS = [
    'moutainProject',
    'website',
    'sendage',
    'eightA',
  ];
  const results = {} as ExternalHref;

  for (let i = 0; i < ROUTE_HREF_KEYS.length; i += 1) {
    if (ROUTE_HREF_KEYS[i] in href && typeof href[ROUTE_HREF_KEYS[i]] === 'string') {
      results[ROUTE_HREF_KEYS[i]] = limitString(href[ROUTE_HREF_KEYS[i]], 10000);
    }
  }

  return results;
}

/**
 * Sanitizes a area's href object.
 *
 * @param {any} href Provided href object.
 * @returns {ExternalHref} Sanitized href object. 
 */
export const sanitizeAreaHref = (href: any): ExternalHref => {
  const AREA_HREF_KEYS = [
    'moutainProject',
    'googleMaps',
    'website',
    'sendage',
    'eightA',
    'coordinates',
    'appleMaps',
  ];
  const results = {} as ExternalHref;

  for (let i = 0; i < AREA_HREF_KEYS.length; i += 1) {
    if (AREA_HREF_KEYS[i] in href && typeof href[AREA_HREF_KEYS[i]] === 'string') {
      results[AREA_HREF_KEYS[i]] = limitString(href[AREA_HREF_KEYS[i]], 10000);
    }
  }

  return results;
}

/**
 * Sanitizes a user's href object.
 *
 * @param {any} href Provided href object.
 * @returns {ExternalHref} Sanitized href object. 
 */
export const sanitizeUserHref = (href: any): ExternalHref => {
  const USER_HREF_KEYS = [
    'moutainProject',
    'website',
    'sendage',
    'eightA',
    'instagram',
    'facebook',
    'twitter',
    'youtube',
    'tiktok',
    'snapchat',
    'strava',
    'phone',
    'email',
  ];
  const results = {} as ExternalHref;

  for (let i = 0; i < USER_HREF_KEYS.length; i += 1) {
    if (USER_HREF_KEYS[i] in href && typeof href[USER_HREF_KEYS[i]] === 'string') {
      results[USER_HREF_KEYS[i]] = limitString(href[USER_HREF_KEYS[i]], 10000);
    }
  }

  return results;
}

/**
 * Sanitizes rating values.
 *
 * @param {any} rating Rating provided.
 * @returns {number} New rating value.
 */
export const sanitizeRating = (rating: any): number => {
  try {
    const value = typeof rating === 'number' ? rating : parseInt(`${rating}`, 10);

    if (value > 5) {
      return 5;
    }
  
    if (value < 0) {
      return 0;
    }

    if ((value * 10) % 5 !== 0) {
      return Math.round((value * 10) / 5) * 5 / 10;
    }

    return value;
  } catch (error) {
    return 0;
  }
}

/**
 * Sanitizes a boolean.
 *
 * @param {any} value Value in question.
 * @returns {boolean} Sanitized boolean.
 */
export const sanitizeBoolean = (value: any): boolean => {
  if (typeof value === 'boolean') {
    return value;
  }

  return `${value}` === 'true';
};

/**
 * Sanitizes number values.
 *
 * @param {any} item Number provided.
 * @returns {number} New number value.
 */
export const sanitizeNumber = (
  item: any,
  round = false,
  max = NaN,
  min = NaN,
  backup = 0,
): number => {
  try {
    const value = typeof item === 'number' ? item : parseInt(`${item}`, 10);

    if (!isNaN(max) && value > max) {
      return max;
    }

    if (!isNaN(min) && value < min) {
      return min;
    }

    return round ? Math.round(value) : value;
  } catch (error) {
    return backup;
  }
}

/**
 * Sanitizes limit values.
 *
 * @param {any} limit Limit provided.
 * @returns {number} New limit value.
 */
export const sanitizeCursorLimit = (limit: any): number => (sanitizeNumber(
  limit,
  true,
  50,
  0,
  50,
));

/**
 * Sanitizes offset values.
 *
 * @param {any} offset Offset provided.
 * @returns {number} New offset value.
 */
export const sanitizeCursorOffset = (offset: any): number => (sanitizeNumber(
  offset,
  true,
  NaN,
  0,
));

/**
 * Sanitizes grade values.
 *
 * @param {any} grade Grade provided.
 * @returns {number} New grade value.
 */
export const sanitizeGrade = (grade: any): number => (sanitizeNumber(
  grade,
  true,
  20,
  -1,
));

/**
 * Sanitizes date values.
 *
 * @param {any} date Date provided.
 * @returns {number} New date value.
 */
export const sanitizeDate = (date: any): number => (sanitizeNumber(
  date,
  true,
));

/**
 * Sanitizes sub-grade values.
 *
 * @param {any} subGrade Sub-grade provided.
 * @returns {number} New sub-grade value.
 */
export const sanitizeSubGrade = (subGrade: any): number => (sanitizeNumber(
  subGrade,
  true,
  10,
  -10,
));

/**
 * Sanitizes danger values.
 *
 * @param {any} danger Danger provided.
 * @returns {number} New danger value.
 */
export const sanitizeDanger = (danger: any): number => (sanitizeNumber(
  danger,
  true,
  5,
  0,
));

const COLORS = [
  'FFB36A',
  'F3FFA1',
  '83FFAF',
  '76B8FF',
  '1BC3FF',
  'FF6F76',
  'FFA94D',
  'BD7BFF',
  '18F5F4',
  '13ED84',
  'FF6CDD',
  'FFBB16',
];

/**
 * Retrieves a random color.
 *
 * @returns {string} Random color.
 */
export const randomColor = (): string => (COLORS[Math.floor(Math.random() * COLORS.length)]);
