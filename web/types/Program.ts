import { Session } from './Session';
import { Venue } from './Venue';

export type Program = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'program';
  event: {
    _ref: string;
    type: 'reference';
  };
  internalName: string;
  sessions: {
    duration?: number;
    _key: string;
    _type: 'padding' | 'slot';
    session?: Session;
  }[];
  startDateTime: string;
  venues: Venue[];
};
