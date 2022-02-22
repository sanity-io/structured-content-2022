import { groq } from 'next-sanity';
import client from '../lib/sanity.server';
import { Section } from '../types/Section';
import SectionBlock from '../components/SectionBlock';
import TextBlock from '../components/TextBlock';
import Heading from '../components/Heading';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from "../components/ConferenceHeader";
import NavBlock from "../components/NavBlock";
import VenueNames from "../components/VenueNames";
import { Venue } from "../types/Venue";

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      ...,
      page-> {
        name,
        sections[] {
          _type == 'reference' => @-> {
            sections[] {
              ...,
              content[] {
                ...,
                reference->,
              },
            },
            ...,
          },
          _type != 'reference' => @,
        }
      }
    },
    "home": *[_id == "aad77280-6394-4090-afad-1c0f2a0416c6"][0] {
      name,
      startDate,
      endDate,
      description,
    },
    "venues": *[_type == "venue"],
  }`;

interface RouteProps {
  data: {
    route: {
      page: {
        name: string;
        sections: Section[];
      };
    };
    home: {
      name: string;
      startDate: string;
      endDate: string;
      description: string;
    };
    venues: Venue[];
  };
  slug: string;
}

const Route = ({
  data: {
    route: {
      page: { name, sections },
    },
    home: { name: homeName, startDate, endDate, description },
    venues,
  },
  slug,
}: RouteProps) => (
    <GridWrapper>
      {slug === '/' ? (
        <GridWrapper>
          <ConferenceHeader
            name={homeName}
            startDate={startDate}
            endDate={endDate}
            description={description}
          />
          <NavBlock/>
          <VenueNames venues={venues}/>
        </GridWrapper>
      ) : (
        <SectionBlock>
          <Heading>{name}</Heading>
        </SectionBlock>
      )}
      <TextBlock value={sections}/>
    </GridWrapper>
  );

export async function getServerSideProps({ params }) {
  const slug = params?.slug?.[0] || '/';
  const data = await client.fetch(QUERY, { slug });
  if (!data?.route?.page) {
    return { notFound: true };
  }

  return { props: { data, slug } };
}

export default Route;
