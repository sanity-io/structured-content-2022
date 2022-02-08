import { Speaker } from "./Speaker";
import { Venue } from "./Venue";

export type Session = {
  _id: string;
  title: string;
  startTime: string;
  duration: number;
  location: Venue;
  speakers: Speaker[];
}
