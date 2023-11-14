export type Dictionary<T> = Record<string, T>;

/**
 * Generic database item.
 */
interface DatabaseItem {
  /**
   * Unique identifier.
   */
  _id?: string;
}

/**
 * References to href of routes.
 */
export interface ExternalHref {
  /**
   * Mountain project page of item.
   */
  moutainProject?: string;

  /**
   * Google maps link of item..
   */
  googleMaps?: string;

  website?: string;

  eightA?: string;

  sendage?: string;

  coordinates?: string;

  appleMaps?: string;
}

export type MediaType = 'image' | 'youtube' | 'instagram' | 'website' | 'drive';

export interface Media {
  type: MediaType;

  href: string;

  caption?: string;

  date?: number;
}

export type AttemptStatus = 'attempt' | 'top-roped' | 'lead' | 'trad' | 'hung' | 'flash' | 'send' | 'day-flash' | 'onsight' | 'ice' | 'project' | 'touch' | 'unknown';

export interface Attempt extends DatabaseItem {
  user: string;

  date: number;

  route: string;

  status: AttemptStatus;

  notes: string;

  updated: number;

  media: Media[];
}

export interface Follow {
  user: string;

  following: string;

  updated: number;
}

export type InterestStatus = 'project' | 'visit' | 'clean';

export interface Interest extends DatabaseItem {
  user: string;

  date: number;

  route: string;

  status: InterestStatus;

  notes: string;
}

export interface Location extends DatabaseItem {
  name: string;

  outdoors: boolean;

  state: string;

  address: string;

  color: string;

  href: ExternalHref;

  media: Media[];

  updated: number;

  submitted: string;
}

export interface Medal extends DatabaseItem {
  user: string;

  type: string;

  data: string;

  updated: number;
}

export interface Rating extends DatabaseItem {
  user: string;

  route: string;

  suggestedGrade: number;

  suggestedSubGrade: number;

  rating: number;

  notes: string;

  updated: number;
}

export interface Review extends DatabaseItem {
  user: string;

  location: string;

  rating: number;

  notes: string;

  updated: number;
}

export interface Route extends DatabaseItem {
  name: string;

  altNames: string[];

  type: string;

  multiPitch: boolean;

  location: string;

  state: string;

  area: string;

  href: ExternalHref;

  grade: number;

  subGrade: number;

  danger: number;

  rating: number;

  updated: number;

  submitted: string;

  media: Media[];
}

export interface Session extends DatabaseItem {
  user: string;

  location: string;

  date: number;

  start: number;

  end: number;

  duration: number;

  areas: string[];

  state: string;

  bouldering: boolean;

  sport: boolean;

  trad: boolean;

  topRope: boolean;

  aid: boolean;

  ice: boolean;

  mixed: boolean;

  alpine: boolean;

  outdoor: boolean;

  felt: number;

  max: UserSends;

  notes: string;

  partners: string[];

  media: Media[];

  updated: number;
}

export type ShoesStatus = 'new' | 'used' | 'worn' | 'hole' | 'resoled' | 'retired';

export interface Shoes extends DatabaseItem {
  user: string;

  date: number;

  brand: string;

  model: string;

  volume: string;

  sizeUS: number;

  sizeEU: number;

  acquired: ShoesStatus;

  status: ShoesStatus;

  resoled: boolean;

  resoleDate: number;

  resoleRubber: string;

  notes: string;

  updated: number;
}

export interface Token {
  user: string;

  token: string;

  created: number;
}

export interface Post extends DatabaseItem {
  user: string;

  date: number;

  route: string;

  location: string;

  type: string;

  privacy: string;
}

export type PrivacyStatus = 'public' | 'unlisted' | 'private';

export interface User extends PublicUser {
  displayName: string;

  password: string;

  email: string;

  admin: boolean;

  created: number;

  privacy: PrivacyStatus;

  attemptPrivacy: PrivacyStatus;

  sessionPrivacy: PrivacyStatus;

  interestPrivacy: PrivacyStatus;

  reviewPrivacy: PrivacyStatus;

  ratingPrivacy: PrivacyStatus;

  shoesPrivacy: PrivacyStatus;
}

export type AreaType = 'area' | 'boulder' | 'wall';

export interface Area extends DatabaseItem {
  name: string;

  altNames: string[];

  location: string;

  parent: string;

  type: AreaType;

  color: string;

  href: ExternalHref;

  media: Media[];

  updated: number;

  submitted: string;
}

export interface PublicUser extends DatabaseItem {
  displayName: string;

  username: string;

  max: UserSends;

  image: string;

  started: number;

  home: string;

  height: number;

  span: number;

  weight: number;

  age: number;

  href: ExternalHref;
}

/**
 * Generic object for logging sends.
 */
export interface UserSends {
  indoorBoulder?: number;

  indoorBoulderFlash?: number;

  indoorTopRope?: number;

  indoorTopRopeFlash?: number;

  indoorTopRopeOnsight?: number;

  indoorLead?: number;

  indoorLeadFlash?: number;

  indoorLeadOnsight?: number;

  outdoorBoulder?: number;

  outdoorBoulderFlash?: number;

  outdoorTopRopeFlash?: number;

  outdoorTopRopeOnsight?: number;

  outdoorLead?: number;

  outdoorLeadFlash?: number;

  outdoorLeadOnsight?: number;

  outdoorTrad?: number;

  outdoorTradFlash?: number;

  outdoorTradOnsight?: number;

  outdoorIce?: number;

  outdoorAid?: number;

  outdoorMixed?: number;

  indoorBoulderSubgrade?: number;

  indoorBoulderFlashSubgrade?: number;

  indoorTopRopeSubgrade?: number;

  indoorTopRopeFlashSubgrade?: number;

  indoorTopRopeOnsightSubgrade?: number;

  indoorLeadSubgrade?: number;

  indoorLeadFlashSubgrade?: number;

  indoorLeadOnsightSubgrade?: number;

  outdoorBoulderSubgrade?: number;

  outdoorBoulderFlashSubgrade?: number;

  outdoorTopRopeFlashSubgrade?: number;

  outdoorTopRopeOnsightSubgrade?: number;

  outdoorLeadSubgrade?: number;

  outdoorLeadFlashSubgrade?: number;

  outdoorLeadOnsightSubgrade?: number;

  outdoorTradSubgrade?: number;

  outdoorTradFlashSubgrade?: number;

  outdoorTradOnsightSubgrade?: number;

  outdoorIceSubgrade?: number;

  outdoorAidSubgrade?: number;

  outdoorMixedSubgrade?: number;
}

export type RouteType = 'boulder' | 'multi-pitch' | 'top-rope' | 'lead' | 'trad' | 'ice' | 'mixed' | 'aid' | 'other';

export interface ErrorResponse {
  status: number;
  message: string;
}
