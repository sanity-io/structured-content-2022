import clsx from 'clsx';
import { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import TextBlock from '../components/TextBlock';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from '../components/ConferenceHeader';
import NavBlock from '../components/NavBlock';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import MetaTags from '../components/MetaTags';
import { usePreviewSubscription } from '../lib/sanity';
import client from '../lib/sanity.server';
import { Figure } from '../types/Figure';
import { Slug } from '../types/Slug';
import { Section } from '../types/Section';
import { Hero as HeroProps } from '../types/Hero';
import { mainEventId } from '../util/entityPaths';
import {
  ARTICLE_SECTION,
  FIGURE,
  HERO,
  PROGRAM,
  QUESTION_AND_ANSWER_COLLECTION_SECTION,
  TEXT_AND_IMAGE_SECTION,
  TICKET,
} from '../util/queries';
import styles from './app.module.css';

const SHARED_SECTIONS = `
  _type,
  _type == "figure" => { ${FIGURE} },
  _type == "articleSection" => { ${ARTICLE_SECTION} },
  _type == "textAndImageSection" => { ${TEXT_AND_IMAGE_SECTION} },
  _type == "questionAndAnswerCollectionSection" => {
    ${QUESTION_AND_ANSWER_COLLECTION_SECTION}
  },
  _type == "speakersSection" => {
    ...,
    speakers[]->,
    "allSpeakers": *[_type == "person"],
  },
  _type == "sessionsSection" => {
    ...,
    sessions[]->,
    "allSessions": *[_type == "session"],
  },
  _type == "venuesSection" => {
    ...,
    venues[]->{name},
    "allVenues": *[_id == "${mainEventId}"][0].venues[]->{name},
  },
  _type == "sponsorsSection" => {
    ...,
    sponsors[]->,
    "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]->,
  },
  _type == "sponsorshipsSection" => {
    ...,
    sponsors[]->,
    "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]->,
  },
  _type == "ticketsSection" => {
    type,
    tickets[]->{ ${TICKET} },
    "allTickets": *[_id == "${mainEventId}"][0].tickets[]->{ ${TICKET} }
  },
  _type == "formSection" => { ... },
  _type == "programsSection" => {
    type,
    programs[]-> { ${PROGRAM} },
    "allPrograms": *[_type == "program"] { ${PROGRAM} }
  },
`;

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      seo { title, description, image { ${FIGURE} }, noIndex },
      page-> {
        hero { ${HERO} },
        sections[] {
          _type == 'reference' => @-> {
            ...,
            sections[] { _key, ${SHARED_SECTIONS} },
          },
          _type != 'reference' => @ { ${SHARED_SECTIONS} }
        }
      }
    },
    "home": *[_id == "${mainEventId}"][0] {
      name,
      description,
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

interface RouteProps {
  data: {
    route: {
      page: {
        name?: string;
        hero?: HeroProps;
        sections: Section[];
      };
      seo: {
        _type: 'seo';
        title: string;
        description: string;
        image?: Figure;
        noIndex?: boolean;
      };
    };
    home: {
      name: string;
      description: string;
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
  preview: boolean;
}

const Route = ({ data: initialData, slug, preview }: RouteProps) => {
  const {
    data: {
      route: {
        page: { hero, sections },
        seo: { title, description: seoDescription, image, noIndex },
      },
      home: { name: homeName, description, ticketsUrl },
      footer,
    },
  } = usePreviewSubscription(QUERY, {
    params: { slug },
    initialData,
    enabled: preview,
  });

  const [scrollTop, setScrollTop] = useState(
    typeof document !== 'undefined' ? document.documentElement.scrollTop : 0
  );
  const [scrolledFarEnough, setScrolledFarEnough] = useState(false);

  /* This is a hack. What we really want is to enable the menu once we've
   * scrolled past the top logo on the front page. Probably a better way would
   * be to give the page a callback so it can use IntersectionObserver and
   * notify us when the right elements have appeared/disappeared from view.
   */
  const scrollPositionTriggeringFrontPageMenu = 420;

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolledFarEnough(scrollTop > scrollPositionTriggeringFrontPageMenu);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const isFrontPage = slug === '/';
  const currentPath = slug.charAt(0) === '/' ? slug : `/${slug}`;
  const headerClasses = clsx(
    styles.header,
    isFrontPage && styles.onFrontPage,
    isFrontPage && scrolledFarEnough && styles.onScrolledFrontPage,
  );

  return (
    <>
      <MetaTags
        {...{ title, description: seoDescription, image, currentPath, noIndex }}
      />
      <header className={headerClasses}>
        <Nav
          onFrontPage={isFrontPage}
          currentPath={currentPath}
          ticketsUrl={ticketsUrl}
        />
      </header>
      <main>
        {slug === '/' ? (
          <GridWrapper>
            <ConferenceHeader name={homeName} description={description} />
            <NavBlock ticketsUrl={ticketsUrl} />
          </GridWrapper>
        ) : (
          <Hero {...hero} />
        )}
        <TextBlock value={sections} />
      </main>
      <Footer links={footer.links} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'route'][].slug.current`;
  const pages = await client.fetch(allSlugsQuery);
  const paths = pages.map((slug) => ({
    params: {
      slug: [urlJoin(slug, { leadingSlash: false })].filter(Boolean),
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug: slugParam },
  preview = false,
}) => {
  const slug = Array.isArray(slugParam)
    ? urlJoin.apply(null, [...slugParam, { leadingSlash: false }])
    : slugParam || '/';
  const data = await client.fetch(QUERY, { slug });
  if (!data?.route?.page) {
    return { notFound: true };
  }

  return { props: { preview, data, slug } };
};

export default Route;
