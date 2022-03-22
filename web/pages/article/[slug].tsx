import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import Hero from '../../components/Hero';
import TextBlock from '../../components/TextBlock';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import client from '../../lib/sanity.server';
import { Slug } from '../../types/Slug';
import { mainEventId } from '../../util/constants';
import GridWrapper from '../../components/GridWrapper';
import { Article } from '../../types/Article';
import articleStyles from './article.module.css';
import styles from '../app.module.css';
import MetaTags from '../../components/MetaTags';
import { BLOCK_CONTENT } from '../../util/queries';

const QUERY = groq`
  {
    "article": *[_type == "article" && slug.current == $slug][0] {
      _id,
      heading,
      summary,
      content[] { ${BLOCK_CONTENT} },
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
    "rewrittenArticleSlugs": *[_type == "article"].slug.current,
  }`;

interface ArticleRouteProps {
  data: {
    article: Article;
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
    rewrittenArticleSlugs?: string[];
  };
  slug: string;
}

const ArticleRoute = ({
  data: {
    article: { heading, summary, content },
    home: { ticketsUrl },
    footer,
    rewrittenArticleSlugs,
  },
  slug,
}: ArticleRouteProps) => (
  <>
    <MetaTags
      title={heading}
      description={summary}
      currentPath={slug}
      rewrittenArticleSlugs={rewrittenArticleSlugs}
    />
    <header className={styles.header}>
      <Nav
        onFrontPage={false}
        currentPath={`/article/${slug}`}
        ticketsUrl={ticketsUrl}
      />
    </header>
    <main>
      <Hero heading={heading} summary={summary} />
      {/* This is a workaround for TextBlock and the types it handles currently
       * being tied to PortableText. Ideally we would just reuse the RichText
       * component here instead of copy/pasting the wrappers/CSS.
       */}
      <GridWrapper>
        <div className={articleStyles.container}>
          <div className={articleStyles.content}>
            <TextBlock value={content} />
          </div>
        </div>
      </GridWrapper>
    </main>
    <Footer links={footer.links} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'article'][].slug.current`;
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
  if (!data?.article?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default ArticleRoute;
