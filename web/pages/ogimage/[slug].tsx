import type { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import client from '../../lib/sanity.server';
import styles from './ogimage.module.css';

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      "title": seo.title
    }
  }`;

const Route = ({ data, slug, preview }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>{data.route.title}</h1>
  </div>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'route'][].slug.current`;
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
  if (!data?.route?.title) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default Route;
