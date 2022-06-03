import YouTube from 'react-youtube';

type YouTubeBlockProps = {
  url: string;
};

const resolveYTId = (url: string): string => {
  try {
    const parsed = new URL(url);
    const domain = parsed.hostname.replace('www.', '');

    // For youtube.com links, the id is in query string
    // https://www.youtube.com/watch?v=kLsER_zHiS4
    if (domain === 'youtube.com') {
      // ?v=kLsER_zHiS4&param2=true -> kLsER_zHiS4
      return parsed.search.split('v=')[1]?.split('&')[0] || '';
    }

    // For youtu.be short links, the id is the pathname
    // https://youtu.be/kLsER_zHiS4
    if (domain === 'youtu.be') {
      // /kLsER_zHiS4/segment-2 -> kLsER_zHiS4
      return parsed.pathname.split('/')[1];
    }

    return '';
  } catch (_error) {
    return '';
  }
};

export function YouTubeBlock({ url }: YouTubeBlockProps): JSX.Element {
  return <YouTube videoId={resolveYTId(url)} />;
}
