import { addMinutes, parseISO } from 'date-fns';
import type { Program, ProgramSession } from '../types/Program';
import type { Session } from '../types/Session';
import {
  defaultTimezone,
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
    (acc, { duration }, i) =>
      i < currentSessionIndex ? acc + (duration || 0) : acc,
    0
  );

export const sessionStart = (
  programStart: string | null,
  sessionId: string,
  sessions: Pick<Session, '_id' | 'duration'>[]
) => {
  if (!programStart || !sessionId) {
    return null;
  }

  const start = parseISO(programStart);
  const sessionIndex = sessions.findIndex(({ _id }) => _id === sessionId);
  const sessionStartOffset =
    sessionIndex > -1 ? minutesFromProgramStart(sessions, sessionIndex) : 0;
  return addMinutes(start, sessionStartOffset);
};

export const getDuration = ({
  session,
  duration,
  durationOverride,
}: ProgramSession) => durationOverride ?? duration ?? session?.duration ?? 0;

type SessionTimingDetails = {
  label: string;
  rawDate: string;
  date: string;
  time: string;
  duration: string;
  timezone: string;
};

/* Given all Programs, finds the Programs that contain the Session (matching on sessionId === _id).
 * For each match, returns:
 * - label: Program's associated Venue name (using the first entry in the Program's Venues array)
 * - rawDate: the Session's start date and time, global date and time string
 * - date: the Session's date, human-readable string
 * - time: the Session's time range accounting for any duration overrides, human-readable string
 * - duration: the Session's duration, human-readable string
 * - timezone: the Session's timezone, human-readable string
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
    .map(({ program, session }) => {
      const start = sessionStart(
        program.startDateTime,
        session?.session?._id || '',
        mapSessionDurationAndIds(program)
      );
      if (!start) {
        return null;
      }

      const [{ name, timezone = defaultTimezone }] = program.venues;
      const duration = session ? getDuration(session) : 0;
      return {
        label: name,
        rawDate: start.toISOString(),
        date: formatDateWithDay(start, timezone, ', '),
        time: formatTimeRange(start, duration, timezone),
        duration: formatTimeDuration(start, duration),
        timezone: getNonLocationTimezone(start, timezone, true),
      };
    })
    .filter(Boolean) as SessionTimingDetails[];

/* Add an _id field to 'padding'-type sessions and normalize duration
 * in order to calculate start/end offsets for all sessions
 */
export const mapSessionDurationAndIds = (program: Program) =>
  program.sessions.map((session) => ({
    ...session,
    duration: getDuration(session),
    _id: session?.session?._id ?? session._key,
  }));
