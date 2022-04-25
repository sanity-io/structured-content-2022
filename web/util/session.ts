import { addMinutes, parseISO } from 'date-fns';
import type { ProgramSession } from '../types/Program';
import type { Session } from '../types/Session';

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

export const getDuration = ({
  session,
  duration,
  durationOverride,
}: ProgramSession) => durationOverride ?? duration ?? session?.duration ?? 0;
