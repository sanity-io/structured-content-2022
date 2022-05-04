import type { GetStaticProps } from 'next';
import { groq } from 'next-sanity';
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
import { getEntityPath } from '../../util/entityPaths';
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
    "venues": *[_type == "venue"],
    "navItems": ${PRIMARY_NAV},
  }
`;

type VenuesRouteProps = {
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
    venues: Venue[];
  };
};

const VenuesRoute = ({
  data: {
    eventName,
    footerLinks,
    navItems,
    newsletterSection,
    ticketsUrl,
    venues,
  },
}: VenuesRouteProps) => (
  <>
    <MetaTags
      title={`Venues – ${eventName}`}
      description={`Venues for page for ${eventName}`}
      currentPath="/venues"
    />
    <header>
      <Nav currentPath="/venues" ticketsUrl={ticketsUrl} items={navItems} />
    </header>
    <main>
      <GridWrapper>
        {venues.map((venue) => (
          <div>
            <h2>{venue.name}</h2>
            <ButtonLink text="More information" url={getEntityPath(venue)} />
          </div>
        ))}
      </GridWrapper>
    </main>
    <TextBlock value={newsletterSection} />
    <Footer links={footerLinks} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.fetch(QUERY);
  if (!data?.venues?.length) {
    return { notFound: true };
  }

  return { props: { data } };
};

export default VenuesRoute;
