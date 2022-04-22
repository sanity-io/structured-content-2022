import { addMinutes, parseISO } from 'date-fns';
import type { Session } from '../types/Session';
import type { Program, ProgramSession } from '../types/Program';
import {
  formatDateWithDay,
  formatTimeDuration,
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

const getDuration = ({ session, duration, durationOverride }: ProgramSession) =>
  durationOverride ?? duration ?? session?.duration ?? 0;

/* Given all Programs, finds the Programs that contain the Session (matching on _id).
 * For each match, returns:
 * - the Program's associated Venue name (using the first entry in the Program's Venues array)
 * - the Session's date (based on the Session's start time)
 * - the Session's time range (accounting for any duration overrides)
 * - the Session's duration
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
      const start = sessionStart(
        startDateTime,
        session.session._id,
        sessions.map((programSession) => ({
          ...programSession.session,
          duration: getDuration(programSession),
        }))
      );

      const [{ name, timezone }] = venues;
      const startDate = parseISO(startDateTime);
      const duration = getDuration(session);
      return {
        label: name,
        rawDate: startDateTime,
        date: formatDateWithDay(startDate, timezone, ', '),
        time: formatTimeRange(start, duration, timezone),
        duration: formatTimeDuration(startDate, duration),
        timezone: getNonLocationTimezone(start, timezone, true),
      };
    });
