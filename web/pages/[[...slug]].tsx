import clsx from 'clsx';
import type { GetStaticPaths, GetStaticProps } from 'next';
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
import type { Figure } from '../types/Figure';
import type { Hero as HeroProps } from '../types/Hero';
import type { PrimaryNavItem } from '../types/PrimaryNavItem';
import type { Section } from '../types/Section';
import type { Slug } from '../types/Slug';
import { mainEventId } from '../util/constants';
import { getOgImagePath } from '../util/entityPaths';
import { getSlug } from '../util/pages';
import {
  ARTICLE_SECTION,
  FIGURE,
  HERO,
  PRIMARY_NAV,
  PROGRAM,
  QUESTION_AND_ANSWER_COLLECTION_SECTION,
  SIMPLE_CALL_TO_ACTION,
  SPEAKER,
  SPONSOR,
  SPONSORSHIP,
  TEXT_AND_IMAGE_SECTION,
  TICKET,
  VENUE,
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
    heading,
    callToAction { ${SIMPLE_CALL_TO_ACTION} }, 
    speakers[]-> { ${SPEAKER} } | order(name),
    "allSpeakers": *[_type == "person"] { ${SPEAKER} } | order(name),
  },
  _type == "sessionsSection" => {
    ...,
    sessions[]->,
    "allSessions": *[_type == "session"],
  },
  _type == "venuesSection" => {
    ...,
    type,
    heading,
    callToAction { ${SIMPLE_CALL_TO_ACTION} }, 
    venues[]->{name},
    "allVenues": *[_id == "${mainEventId}"][0].venues[]->{name},
  },
  _type == "sponsorsSection" => {
    ...,
    sponsors[]->{ ${SPONSOR} },
    "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]-> { ${SPONSORSHIP} },
  },
  _type == "sponsorshipsSection" => {
    ...,
    "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]-> { ${SPONSORSHIP} },
  },
  _type == "ticketsSection" => {
    type,
    heading,
    callToAction { ${SIMPLE_CALL_TO_ACTION} },
    tickets[]->{ ${TICKET} },
    "allTickets": *[_id == "${mainEventId}"][0].tickets[]->{ ${TICKET} }
  },
  _type == "formSection" => { ... },
  _type == "programsSection" => {
    type,
    heading,
    programs[]-> { ${PROGRAM} },
    "allPrograms": *[_type == "program"] { ${PROGRAM} },
    "mainVenue": *[_id == "${mainEventId}"][0].venues[0]-> { ${VENUE} },
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
    navItems?: PrimaryNavItem[];
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
      home: { name: mainEventName, description, ticketsUrl },
      footer,
      navItems,
    },
  } = usePreviewSubscription(QUERY, {
    params: { slug },
    initialData,
    enabled: preview,
  });

  const [scrolledFarEnough, setScrolledFarEnough] = useState(false);

  /* This is a hack. What we really want is to enable the menu once we've
   * scrolled past the top logo on the front page. Probably a better way would
   * be to give the page a callback so it can use IntersectionObserver and
   * notify us when the right elements have appeared/disappeared from view.
   */
  const scrollPositionTriggeringFrontPageMenu = 420;

  useEffect(() => {
    const onScroll = (e: { target: any }) =>
      setScrolledFarEnough(
        e.target.documentElement.scrollTop >
          scrollPositionTriggeringFrontPageMenu
      );
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isFrontPage = slug === '/';
  const currentPath = slug.charAt(0) === '/' ? slug : `/${slug}`;
  const headerClasses = clsx(
    styles.header,
    isFrontPage && styles.onFrontPage,
    isFrontPage && scrolledFarEnough && styles.scrolledDown
  );
  /* This could be defined in the Sanity schema in the future, if this codebase
   * is reused for other conferences. (Don't want to link to tickets page after
   * the conference has happened.)
   */
  const showTicketsLink = false;

  return (
    <>
      <MetaTags
        {...{ title, description: seoDescription, image, currentPath, noIndex }}
        fallbackImage={{
          url: getOgImagePath(title),
          alt: [mainEventName, title].filter(Boolean).join(' – '),
        }}
      />
      <header className={headerClasses}>
        <Nav
          onFrontPage={isFrontPage}
          currentPath={currentPath}
          ticketsUrl={showTicketsLink ? ticketsUrl : undefined}
          items={navItems}
        />
      </header>
      <main>
        {slug === '/' ? (
          <GridWrapper>
            <ConferenceHeader name={mainEventName} description={description} />
            <NavBlock ticketsUrl={showTicketsLink ? ticketsUrl : undefined} />
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
  const allSlugsQuery = groq`
    {
      "slugs": *[defined(slug.current) && _type == 'route'][].slug.current,
      "programVenues": *[_type == 'program'].venues[]->.slug.current,
    }
  `;
  const { slugs, programVenues } = await client.fetch(allSlugsQuery);
  const programSlugs = Array.from<string>(new Set(programVenues)).map((slug) =>
    urlJoin('program', { query: { venue: slug } })
  );
  const paths = [...slugs, ...programSlugs].map((slug) => ({
    params: {
      slug: [urlJoin(slug, { leadingSlash: false })].filter(Boolean),
    },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  const slug = getSlug(params) || '/';
  const data = await client.fetch(QUERY, { slug });
  if (!data?.route?.page) {
    return { notFound: true };
  }

  return { props: { preview, data, slug } };
};

export default Route;
