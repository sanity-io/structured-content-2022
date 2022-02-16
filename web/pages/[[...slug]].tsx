import { groq } from 'next-sanity';
import client from '../lib/sanity.server';
import { Section } from '../types/Section';
import SectionBlock from '../components/SectionBlock';
import TextBlock from '../components/TextBlock';
import Heading from '../components/Heading';
import PageContainer from '../components/PageContainer';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const QUERY = groq`
  {
    "route": *[_type == "route" && slug.current == $slug][0] {
      ...,
      page-> {
        name,
        sections
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
      <PageContainer>
        <header>
          <Nav />
          <SectionBlock>
            <Heading>{name}</Heading>
          </SectionBlock>
        </header>
        <SectionBlock>
          <TextBlock value={sections} />
        </SectionBlock>
      </PageContainer>
      <Footer />
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
