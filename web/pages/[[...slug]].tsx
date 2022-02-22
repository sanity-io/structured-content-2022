import { groq } from 'next-sanity';
import client from '../lib/sanity.server';
import { Section } from '../types/Section';
import Hero from '../components/Hero';
import TextBlock from '../components/TextBlock';

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      ...,
      page-> {
        name,
        sections[] {
          _type == 'reference' => @->,
          _type != 'reference' => @,
        }
      }
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
  };
}

const Route = ({
  data: {
    route: {
      page: { name, sections },
    },
  },
}: RouteProps) => {
  return (
    <>
      <Hero heading={name} />
      <TextBlock value={sections} />
    </>
  );
};

export async function getServerSideProps({ params }) {
  const data = await client.fetch(QUERY, { slug: params?.slug?.[0] || '/' });
  if (!data?.route?.page) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default Route;
