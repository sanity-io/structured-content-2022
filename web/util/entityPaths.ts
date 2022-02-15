import { Session } from "../types/Session";
import { Venue } from "../types/Venue";
import { Speaker } from "../types/Speaker";
import { Sponsor } from "../types/Sponsor";

type Entity = Speaker | Session | Venue | Sponsor;

export const getEntityPath = (entity: Entity) => {
  console.log(entity.slug?.current);
  if (!entity.slug?.current) {
    return "#";
  }

  switch (entity._type) {
    case "session":
      return `/sessions/${entity.slug?.current}`;
    case "person":
      return `/speakers/${entity.slug?.current}`;
    case "venue":
      return `/venues/${entity.slug?.current}`;
    case "sponsor":
      return `/sponsors/${entity.slug?.current}`;
    default:
      return "";
  }
};
