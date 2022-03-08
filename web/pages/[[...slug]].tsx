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
import styles from './app.module.css';

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      ...,
      page-> {
        name,
        hero {
          ...,
          callToAction {
            ...,
            reference->{slug},
          },
        },
        sections[] {
          _type == 'reference' => @-> {
            ...,
            sections[] {
              ...,
              _type == "sponsorsSection" => {
                ...,
                sponsors[]->,
                "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]->,
              },
              _type == "simpleCallToAction" => {
                ...,
                reference->,
              },
              _type == "venuesSection" => {
                ...,
                venues[]->,
                "allVenues": *[_id == "${mainEventId}"][0].venues[]->,
              },
              _type == "sessionsSection" => {
                ...,
                sessions[]->,
                "allSessions": *[_type == "session"],
              },
              _type == "speakersSection" => {
                ...,
                speakers[]->,
                "allSpeakers": *[_type == "person"],
              },              
              _type == "ticketsSection" => {
                ...,
                tickets[]->,
                "allTickets": *[_id == "${mainEventId}"][0].tickets[]->
              },
              content[] {
                ...,
                reference->,
              },
            },
          },
          _type != 'reference' => @ {
            ...,
            _type == "ticketsSection" => {
              ...,
              tickets[]->,
              "allTickets": *[_id == "${mainEventId}"][0].tickets[]->
            },
            _type == "venuesSection" => {
              ...,
              venues[]->,
              "allVenues": *[_id == "${mainEventId}"][0].venues[]->,
            },
            _type == "sponsorshipsSection" => {
              ...,
              sponsors[]->,
              "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]->,
            },
            _type == "sponsorsSection" => {
              ...,
              sponsors[]->,
              "allSponsorships": *[_id == "${mainEventId}"][0].sponsorships[]->,
            },
            _type == "programsSection" => {
              ...,
              programs[]-> {
                ...,
                sessions[] {
                  ...,
                  session->,
                },
                venues[]->,
              },
              "allPrograms": *[_type == "program"] {
                ...,
                sessions[] {
                  ...,
                  session->,
                },
                venues[]->,
              }
            },
            content[] {
              ...,
              reference->,
            },
          },
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

  /* This is a hack. What we really want is to enable the menu once we've
   * scrolled past the top logo on the front page. Probably a better way would
   * be to give the page a callback so it can use IntersectionObserver and
   * notify us when the right elements have appeared/disappeared from view.
   */
  const scrollPositionTriggeringFrontPageMenu = 420;

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const isFrontPage = slug === '/';
  const currentPath = slug.charAt(0) === '/' ? slug : `/${slug}`;
  const scrolledFarEnough = scrollTop > scrollPositionTriggeringFrontPageMenu;
  const headerClasses = clsx(
    styles.header,
    isFrontPage && styles.onFrontPage,
    isFrontPage && scrolledFarEnough && styles.onScrolledFrontPage
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
      slug: [urlJoin(slug, { leadingSlash: false })],
    },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug: s = '/' },
  preview = false,
}) => {
  const slug = Array.isArray(s)
    ? urlJoin.apply(null, [...s, { leadingSlash: false }])
    : s;
  const data = await client.fetch(QUERY, { slug });
  if (!data?.route?.page) {
    return { notFound: true };
  }

  return { props: { preview, data, slug } };
};

export default Route;
