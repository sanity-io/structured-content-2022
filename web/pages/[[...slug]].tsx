import clsx from 'clsx';
import { groq } from 'next-sanity';
import { NextSeo } from 'next-seo';
import urlJoin from 'proper-url-join';
import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import TextBlock from '../components/TextBlock';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from '../components/ConferenceHeader';
import NavBlock from '../components/NavBlock';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import client from '../lib/sanity.server';
import { Slug } from '../types/Slug';
import { Section } from '../types/Section';
import { Hero as HeroProps } from '../types/Hero';
import { mainEventId } from '../util/entityPaths';
import styles from './app.module.css';
import { imageUrlFor } from '../lib/sanity';

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      ...,
      page-> {
        name,
        hero,
        sections[] {
          _type == 'reference' => @-> {
            sections[] {
              ...,
              _type == "sponsorsSection" => {
                ...,
                sponsors[]->,
                "allSponsors": *[_type == "sponsor"] {
                  ...,
                  sponsorship->,
                },
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
            ...,
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
              "sponsorships": *[_id == "${mainEventId}"][0].sponsorships[]->,
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
      startDate,
      endDate,
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
        image?: {
          asset: {
            url: string;
          };
        };
        noIndex?: boolean;
      };
    };
    home: {
      name: string;
      startDate: string;
      endDate: string;
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
}

const Route = ({
  data: {
    route: {
      page: { name, hero, sections },
      seo: { title, description: seoDescription, image, noIndex },
    },
    home: { name: homeName, startDate, endDate, description, ticketsUrl },
    footer,
  },
  slug,
}: RouteProps) => {
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
      <NextSeo
        title={title}
        description={seoDescription}
        canonical={urlJoin('https://structuredcontent.live', currentPath)}
        noindex={noIndex}
        openGraph={
          image
            ? {
                images: [
                  {
                    url: imageUrlFor(image)
                      .ignoreImageParams()
                      .size(1260, 630)
                      .url(),
                  },
                ],
              }
            : undefined
        }
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
            <ConferenceHeader
              name={homeName}
              startDate={startDate}
              endDate={endDate}
              description={description}
            />
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

export async function getServerSideProps({ params }) {
  const slug = params?.slug?.[0] || '/';
  const data = await client.fetch(QUERY, { slug });
  if (!data?.route?.page) {
    return { notFound: true };
  }

  return { props: { data, slug } };
}

export default Route;
