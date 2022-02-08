import { Speaker } from "./Speaker";

export type Session = {
  title: string;
  startTime: string;
  duration: number;
  location: any;
  speakers: Speaker[];
}
