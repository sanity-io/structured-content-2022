import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import Card from '../../components/Card';
import Hero from '../../components/Hero';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import TextBlock from '../../components/TextBlock';
import client from '../../lib/sanity.server';
import { formatDate } from '../../util/date';
import { mainEventId } from '../../util/entityPaths';
import { BLOCK_CONTENT } from '../../util/queries';
import { Article } from '../../types/Article';
import { Slug } from '../../types/Slug';
import styles from '../app.module.css';
import articleStyles from './article.module.css';

const QUERY = groq`
  {
    "article": *[_type == "article" && slug.current == $slug][0] {
      _createdAt,
      _id,
      _updatedAt,
      heading,
      summary,
      content[] { ${BLOCK_CONTENT} },
      authors[]->{name, photo},
      relatedTo {
        people[]->{name, photo},
        "sessions": sessions[]->{title}.title,
        "venues": venues[]->{name}.name,
      },
    },
    "home": *[_id == "${mainEventId}"][0] {
      "ticketsUrl": microcopy[key == "mainCta"][0].action,
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
    article: {
      _createdAt,
      _updatedAt,
      heading,
      summary,
      content,
      authors,
      relatedTo,
    },
    home: { ticketsUrl },
    footer,
    rewrittenArticleSlugs,
  },
  slug,
}: ArticleRouteProps) => {
  const { people, sessions, venues } = relatedTo || {};
  return (
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
        <Hero heading={heading} summary={summary}>
          <div className={articleStyles.extraHeroContent}>
            <div>
              {Array.isArray(authors) &&
                authors.map(({ name, photo }) => (
                  <Card key={name} figure={photo}>
                    {name}
                  </Card>
                ))}
            </div>
            <div>
              <p className={articleStyles.publishedAt}>
                Published on: {formatDate(_createdAt, 'UTC')}
              </p>
              {_updatedAt && (
                <p className={articleStyles.updatedAt}>
                  Updated on: {formatDate(_updatedAt, 'UTC')}
                </p>
              )}
            </div>
          </div>
        </Hero>
        {/* This is a workaround for TextBlock and the types it handles currently
         * being tied to PortableText. Ideally we would just reuse the RichText
         * component here instead of copy/pasting the wrappers/CSS.
         */}
        <GridWrapper>
          <div className={articleStyles.container}>
            <div className={articleStyles.content}>
              <div>
                <TextBlock value={content} />

                {Array.isArray(sessions) && sessions.length && (
                  <div>
                    <h3>Related sessions</h3>
                    {sessions.map((title, index) => (
                      <Card key={`${title}_${index}`}>{title}</Card>
                    ))}
                  </div>
                )}

                {Array.isArray(people) && people.length && (
                  <div>
                    <h3>Related people</h3>
                    {people.map(({ name, photo }, index) => (
                      <Card key={`${name}_${index}`} figure={photo}>
                        {name}
                      </Card>
                    ))}
                  </div>
                )}

                {Array.isArray(venues) && venues.length && (
                  <div>
                    <h3>Related venues</h3>
                    {venues.map((name, index) => (
                      <Card key={`${name}_${index}`}>{name}</Card>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </GridWrapper>
      </main>
      <Footer links={footer.links} />
    </>
  );
};

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
