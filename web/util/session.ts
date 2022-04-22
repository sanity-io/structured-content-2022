import { addMinutes, parseISO } from 'date-fns';
import type { Session } from '../types/Session';
import type { Program } from '../types/Program';
import {
  formatDateWithDay,
  formatTimeRange,
  getNonLocationTimezone,
} from './date';

const minutesFromProgramStart = (
  sessions: Pick<Session, 'duration'>[],
  currentSessionIndex: number
) =>
  sessions.reduce(
    (acc, { duration }, i) => (i < currentSessionIndex ? acc + duration : acc),
    0
  );

export const sessionStart = (
  programStart: string | null,
  sessionId: string,
  sessions: Pick<Session, '_id' | 'duration'>[]
) => {
  if (!programStart) {
    return null;
  }

  const start = parseISO(programStart);
  const sessionIndex = sessions.findIndex(({ _id }) => _id === sessionId);
  const sessionStartOffset =
    sessionIndex > -1 ? minutesFromProgramStart(sessions, sessionIndex) : 0;
  return addMinutes(start, sessionStartOffset);
};

/* Given all Programs, finds the Programs that contain the Session (matching on _id).
 * For each match, returns:
 * - the Program's associated Venue name (using the first entry in the Program's Venues array)
 * - the Session's date (based on the Session's start time)
 * - the Session's time range (accounting for any duration overrides)
 * - the Session's timezone
 */
export const sessionTimingDetailsForMatchingPrograms = (
  programs: Program[],
  sessionId: string
) =>
  programs
    .map((program) => ({
      program,
      session: program.sessions.find((s) => s.session?._id === sessionId),
    }))
    .filter((entry) => Boolean(entry.session))
    .map(({ program: { sessions, startDateTime, venues }, session }) => {
      const [{ name, timezone }] = venues;
      const start = sessionStart(
        startDateTime,
        session.session._id,
        sessions.map(({ session, duration, durationOverride }) => ({
          ...session,
          duration: durationOverride ?? duration ?? session?.duration ?? 0,
        }))
      );
      return {
        label: name,
        date: formatDateWithDay(parseISO(startDateTime), timezone, ', '),
        time: formatTimeRange(
          start,
          session.durationOverride ??
            session.duration ??
            session.session.duration,
          timezone
        ),
        timezone: getNonLocationTimezone(start, timezone, true),
      };
    });
