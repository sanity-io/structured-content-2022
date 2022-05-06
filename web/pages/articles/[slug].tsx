import clsx from 'clsx';
import { parseISO } from 'date-fns';
import type { GetStaticPaths, GetStaticProps } from 'next';
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
import { mainEventId } from '../../util/constants';
import { getOgImagePath } from '../../util/entityPaths';
import { getSlug } from '../../util/pages';
import { BLOCK_CONTENT, PRIMARY_NAV } from '../../util/queries';
import type { Article } from '../../types/Article';
import type { PrimaryNavItem } from '../../types/PrimaryNavItem';
import type { Slug } from '../../types/Slug';
import styles from '../app.module.css';
import articleStyles from './article.module.css';

const QUERY = groq`
  {
    "article": *[_type == "article" && slug.current == $slug][0] {
      _id,
      heading,
      summary,
      publishedAt,
      updatedAt,
      content[] { ${BLOCK_CONTENT} },
      authors[]->{name, photo},
      relatedTo {
        people[]->{name, photo},
        "sessions": sessions[]->{title}.title,
        "venues": venues[]->{name}.name,
      },
    },
    "home": *[_id == "${mainEventId}"][0] {
      "ticketsUrl": registrationUrl,
    },
    "navItems": ${PRIMARY_NAV},
    "footer": *[_id == "secondary-nav"][0] {
      "links": tree[].value.reference-> {
        "name": seo.title,
        slug,
        _id,
      }
    },
    "rewrittenArticleSlugs": *[_type == "article"].slug.current,
  }`;

interface ArticlesRouteProps {
  data: {
    article: Article;
    home: {
      ticketsUrl: string;
    };
    navItems?: PrimaryNavItem[];
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

const ArticlesRoute = ({
  data: {
    article: {
      heading,
      summary,
      publishedAt,
      updatedAt,
      content,
      authors,
      relatedTo,
    },
    home: { ticketsUrl },
    navItems,
    footer,
    rewrittenArticleSlugs,
  },
  slug,
}: ArticlesRouteProps) => {
  const { people, sessions, venues } = relatedTo || {};
  const hasAsides =
    (Array.isArray(sessions) && sessions.length) ||
    (Array.isArray(people) && people.length) ||
    (Array.isArray(venues) && venues.length);
  return (
    <>
      <MetaTags
        title={heading}
        description={summary}
        currentPath={slug}
        rewrittenArticleSlugs={rewrittenArticleSlugs}
        fallbackImage={{ url: getOgImagePath(heading), alt: heading }}
      />
      <header className={styles.header}>
        <Nav
          currentPath={`/articles/${slug}`}
          ticketsUrl={ticketsUrl}
          items={navItems}
        />
      </header>
      <main>
        <Hero heading={heading} summary={summary}>
          <div className={articleStyles.extraHeroContent}>
            {Array.isArray(authors) && (
              <ul className={articleStyles.authors}>
                {authors.map(({ name, photo }) => (
                  <li key={name} className={articleStyles.author}>
                    <Card figure={photo}>{name}</Card>
                  </li>
                ))}
              </ul>
            )}
            <div className={articleStyles.timestamps}>
              {publishedAt && (
                <p className={articleStyles.publishedAt}>
                  Published on: {formatDate(parseISO(publishedAt), 'UTC')}
                </p>
              )}
              {updatedAt && (
                <p className={articleStyles.updatedAt}>
                  Updated on: {formatDate(parseISO(updatedAt), 'UTC')}
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
            <div
              className={clsx(
                articleStyles.mainContent,
                hasAsides && articleStyles.asidesPresent
              )}
            >
              <TextBlock value={content} />
            </div>
            {hasAsides && (
              <div className={articleStyles.asides}>
                {Array.isArray(sessions) && sessions.length && (
                  <aside className={articleStyles.relatedItems}>
                    <h2 className={articleStyles.relatedItemsHeading}>
                      Related sessions
                    </h2>
                    <ul className={articleStyles.relatedItemsList}>
                      {sessions.map((title, index) => (
                        <li
                          key={`${title}_${index}`}
                          className={articleStyles.relatedItem}
                        >
                          <Card>{title}</Card>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {Array.isArray(people) && people.length && (
                  <aside className={articleStyles.relatedItems}>
                    <h2 className={articleStyles.relatedItemsHeading}>
                      Related people
                    </h2>
                    <ul className={articleStyles.relatedItemsList}>
                      {people.map(({ name, photo }, index) => (
                        <li
                          key={`${name}_${index}`}
                          className={articleStyles.relatedItem}
                        >
                          <Card figure={photo}>{name}</Card>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}

                {Array.isArray(venues) && venues.length && (
                  <aside className={articleStyles.relatedItems}>
                    <h2 className={articleStyles.relatedItemsHeading}>
                      Related venues
                    </h2>
                    <ul className={articleStyles.relatedItemsList}>
                      {venues.map((name, index) => (
                        <li
                          key={`${name}_${index}`}
                          className={articleStyles.relatedItem}
                        >
                          <Card>{name}</Card>
                        </li>
                      ))}
                    </ul>
                  </aside>
                )}
              </div>
            )}
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
    .map((slug: string) => ({
      params: { slug: urlJoin(slug, { leadingSlash: false }) },
    }))
    .filter(({ params: { slug } }: { params: { slug: string } }) =>
      Boolean(slug)
    );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = getSlug(params);
  const data = await client.fetch(QUERY, { slug });
  if (!data?.article?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default ArticlesRoute;
