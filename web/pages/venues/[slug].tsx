import type { GetStaticProps, GetStaticPaths } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import ButtonLink from '../../components/ButtonLink';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import TextBlock from '../../components/TextBlock';
import client from '../../lib/sanity.server';
import type { Section } from '../../types/Section';
import type { Slug } from '../../types/Slug';
import type { PrimaryNavItem } from '../../types/PrimaryNavItem';
import type { Venue } from '../../types/Venue';
import { mainEventId, newsletterSharedSectionId } from '../../util/constants';
import { getEntityPath, getOgImagePath } from '../../util/entityPaths';
import { getSlug } from '../../util/pages';
import { PRIMARY_NAV } from '../../util/queries';

const QUERY = groq`
  {
    "eventName": *[_id == "${mainEventId}"][0].name,
    "footerLinks": *[_id == "secondary-nav"][0].tree[].value.reference-> {
      "name": seo.title,
      slug,
      _id,
    },
    "ticketsUrl": *[_id == "${mainEventId}"][0].registrationUrl,
    "newsletterSection": *[_id == "${newsletterSharedSectionId}"][0],
    "venue": *[_type == "venue" && slug.current == $slug][0],
    "navItems": ${PRIMARY_NAV},
  }
`;

type VenueRouteProps = {
  data: {
    eventName: string;
    footerLinks: {
      _id: string;
      name: string;
      slug: Slug;
    }[];
    navItems?: PrimaryNavItem[];
    newsletterSection: Section;
    ticketsUrl: string;
    venue: Venue;
  };
  slug: string;
};

const accessibilityFieldTitles = {
  wheelchair: 'Wheelchair Accessible',
  parking: 'Accessible parking',
  prioritySeating: 'Priority Seating',
  captioning: 'Closed Captioning',
  neutralRestroom: 'Gender neutral restrooms',
};

const VenueRoute = ({
  data: {
    eventName,
    footerLinks,
    navItems,
    newsletterSection,
    ticketsUrl,
    venue,
  },
  slug,
}: VenueRouteProps) => {
  const title = `${venue.name} venue`;
  return (
    <>
      <MetaTags
        title={`${title} – ${eventName}`}
        description={`${venue.name} venues for page for ${eventName}`}
        currentPath={urlJoin('venues', slug)}
        fallbackImage={{ url: getOgImagePath(title), alt: title }}
      />
      <header>
        <Nav
          currentPath={urlJoin('venues', slug)}
          ticketsUrl={ticketsUrl}
          items={navItems}
        />
      </header>
      <main>
        <GridWrapper>
          {venue.directions && (
            <>
              <h2>Directions</h2>
              <TextBlock value={venue.directions} />
            </>
          )}

          {venue.accomodations && (
            <>
              <h2>Accommodations</h2>
              <TextBlock value={venue.accomodations} />
            </>
          )}
          {venue.acccesibility && (
            <>
              <h2>Accessibility</h2>
              <ul>
                {Object.keys(venue.acccesibility)
                  .filter((key) => venue.acccesibility[key] === true)
                  .map((key) => (
                    <li key={key}>{accessibilityFieldTitles[key]}</li>
                  ))}
              </ul>
            </>
          )}

          <div>
            <h2>{venue.name}</h2>
            <ButtonLink text="More information" url={getEntityPath(venue)} />
          </div>
        </GridWrapper>
      </main>
      <TextBlock value={newsletterSection} />
      <Footer links={footerLinks} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'venue'][].slug.current`;
  const pages = await client.fetch(allSlugsQuery);
  const paths = pages
    .map((slug) => ({
      params: { slug: urlJoin(slug, { leadingSlash: false }) },
    }))
    .filter(({ params: { slug } }) => Boolean(slug));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = getSlug(params);
  const data = await client.fetch(QUERY, { slug });
  if (!data?.venue) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default VenueRoute;
