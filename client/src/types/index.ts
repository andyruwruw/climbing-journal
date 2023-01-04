export interface DatabaseItem {
  _id?: string;
}

export interface LocationRating extends DatabaseItem {
  user: UserReference;
  location: LocationReference;
  notes: string;
  rating: number;
}
export type LocationRatingReference = string | LocationRating;

export interface Location extends DatabaseItem {
  name: string;
  locale: string;
  address: string;
  outdoors: boolean;
  image: string;
  updated?: Date;
}
export type LocationReference = string | LocationRating;

export interface Medal extends DatabaseItem {
  user: UserReference;
  location: LocationReference | null;
  type: string;
  data: string;
  created?: Date;
}
export type MedalReference = string | Medal;

export type SessionFocus = 'bouldering' | 'top-rope' | 'sport' | 'trad' | 'ice' | 'mixed' | 'training' | 'other';

export type MaxSends = {
  boulder: number | null;
  topRope: number | null;
  sport: number | null;
  trad: number | null;
  speed: number | null;
  mixed: number | null;
  ice: number | null;
};

export interface Session extends DatabaseItem {
  user: UserReference;
  location: LocationReference;
  start: Date;
  duration: number;
  notes?: string;
  ability: number;
  felt: number;
  focus: SessionFocus[];
  max: MaxSends;
  images: string[];
  updated?: Date;
}
export type SessionReference = string | Session;

export interface User extends DatabaseItem {
  name: string;
  username: string;
  started: Date;
  height: number;
  span: number;
  weight: number;
  created?: Date;
  image: string;
}
export type UserReference = string | User;

export interface Follow extends DatabaseItem {
  user: UserReference;
  following: UserReference;
  created?: Date;
}
export type FollowReference = string | Follow;
