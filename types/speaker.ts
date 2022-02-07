export type Speaker = {
  name: string;
  title: string;
  bio: {
    children: {
      text: string;
    }[]
  }[];
  photo: string,
    twitter: string;
};
