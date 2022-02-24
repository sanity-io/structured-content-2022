import { groq } from 'next-sanity';
import client from '../lib/sanity.server';
import { Section } from '../types/Section';
import Hero from '../components/Hero';
import TextBlock from '../components/TextBlock';
import GridWrapper from '../components/GridWrapper';
import ConferenceHeader from '../components/ConferenceHeader';
import NavBlock from '../components/NavBlock';

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
              _type == "sponsorsSection" => {
                ...,
                "sponsors": *[_type == "sponsor"] {
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
                "venues": *[_type == "venue"]
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
            content[] {
              ...,
              reference->,
            },
          },
        }
      }
    },
    "home": *[_id == "aad77280-6394-4090-afad-1c0f2a0416c6"][0] {
      name,
      startDate,
      endDate,
      description,
    }
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
  };
  slug: string;
}

const Route = ({
  data: {
    route: {
      page: { name, sections },
    },
    home: { name: homeName, startDate, endDate, description },
  },
  slug,
}: RouteProps) => (
  <>
    {slug === '/' ? (
      <GridWrapper>
        <ConferenceHeader
          name={homeName}
          startDate={startDate}
          endDate={endDate}
          description={description}
        />
        <NavBlock />
      </GridWrapper>
    ) : (
      <Hero heading={name} />
    )}
    <TextBlock value={sections} />
  </>
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
