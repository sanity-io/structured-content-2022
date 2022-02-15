import { Slug } from "./Slug";

export type Speaker = {
  _id: string;
  name: string;
  title: string;
  _type: "person";
  bio?: {
    children: {
      text: string;
    }[];
  }[];
  photo: string;
  twitter: string;
  slug: Slug;
};
