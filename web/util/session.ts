import { addMinutes } from 'date-fns';

type SimpleSession = {
  duration: number;
  id: string;
};

const minutesFromProgramStart = (
  sessions: SimpleSession[],
  currentSessionIndex: number
) =>
  sessions.reduce(
    (acc, { duration }, i) => (i < currentSessionIndex ? acc + duration : acc),
    0
  );

export const sessionStartTime = (
  programStart: string | null,
  sessionId: string,
  sessions: SimpleSession[]
) => {
  if (!programStart) {
    return null;
  }

  const start = new Date(programStart);
  const sessionIndex = sessions.findIndex(({ id }) => id === sessionId);
  const sessionStartOffset =
    sessionIndex > -1 ? minutesFromProgramStart(sessions, sessionIndex) : 0;
  return addMinutes(start, sessionStartOffset);
};
