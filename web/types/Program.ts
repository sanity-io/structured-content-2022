import { Session } from './Session';
import { Venue } from './Venue';

export type ProgramSession = {
  duration?: number;
  durationOverride?: number;
  _key: string;
  _type: 'padding' | 'slot';
  session?: Session;
};

export type Program = {
  _id: string;
  internalName: string;
  sessions: ProgramSession[];
  startDateTime: string;
  venues: Venue[];
};
