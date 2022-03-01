import clsx from 'clsx';
import { groq } from 'next-sanity';
import { useEffect, useState } from 'react';
import Hero from '../../components/Hero';
import TextBlock from '../../components/TextBlock';
import Footer from '../../components/Footer';
import Nav from '../../components/Nav';
import client from '../../lib/sanity.server';
import { Slug } from '../../types/Slug';
import styles from '../app.module.css';
import articleStyles from './article.module.css';
import { mainEventId } from '../../util/entityPaths';
import GridWrapper from '../../components/GridWrapper';
import { Article } from '../../types/Article';

const QUERY = groq`
  {
    "article": *[_type == "article" && slug.current == $slug][0],
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
  };
  slug: string;
}

const ArticleRoute = ({
  data: {
    article: { heading, summary, content },
    home: { ticketsUrl },
    footer,
  },
  slug,
}: ArticleRouteProps) => (
  <>
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

export async function getServerSideProps({ params }) {
  const slug = params?.slug;
  if (!slug) {
    return { notFound: true };
  }

  const data = await client.fetch(QUERY, { slug });
  if (!data?.article?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
}

export default ArticleRoute;