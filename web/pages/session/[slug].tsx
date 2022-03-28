import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import Footer from '../../components/Footer';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import client from '../../lib/sanity.server';
import { mainEventId } from '../../util/constants';
import { Slug } from '../../types/Slug';
import { Session } from '../../types/Session';
import styles from '../app.module.css';

const QUERY = groq`
  {
    "session": *[_type == "session" && slug.current == $slug][0] {
      _id,
      title,
      duration
    },
    "home": *[_id == "${mainEventId}"][0] {
      "ticketsUrl": registrationUrl,
    },
    "footer": *[_id == "secondary-nav"][0] {
      "links": tree[].value.reference-> {
        "name": seo.title,
        slug,
        _id,
      }
    },
  }`;

interface SessionRouteProps {
  data: {
    session: Session;
    home: {
      ticketsUrl: string;
    };
    footer: {
      links: {
        name: string;
        slug: Slug;
        _id: string;
      }[];
    };
  };
  slug: string;
}

const SessionRoute = ({
  data: {
    session: { title, duration },
    home: { ticketsUrl },
    footer,
  },
  slug,
}: SessionRouteProps) => {
  return (
    <>
      <MetaTags title={title} description="" currentPath={`session/${slug}`} />
      <header className={styles.header}>
        <Nav
          onFrontPage={false}
          currentPath={`/session/${slug}`}
          ticketsUrl={ticketsUrl}
        />
      </header>
      <main>
        <h1>{title}</h1>
        <p>{duration}</p>
      </main>
      <Footer links={footer.links} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'session'][].slug.current`;
  const pages = await client.fetch(allSlugsQuery);
  const paths = pages
    .map((slug) => ({
      params: {
        slug: urlJoin(slug, { leadingSlash: false }),
      },
    }))
    .filter(({ params: { slug } }) => Boolean(slug));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug: slugParam },
}) => {
  const slug = Array.isArray(slugParam)
    ? urlJoin.apply(null, [...slugParam, { leadingSlash: false }])
    : slugParam;
  const data = await client.fetch(QUERY, { slug });
  if (!data?.session?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default SessionRoute;
