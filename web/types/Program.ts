import { Session } from './Session';
import { Venue } from './Venue';

export type Program = {
  _id: string;
  internalName: string;
  sessions: {
    duration?: number;
    durationOverride?: number;
    _key: string;
    _type: 'padding' | 'slot';
    session?: Session;
  }[];
  startDateTime: string;
  venues: Venue[];
};
