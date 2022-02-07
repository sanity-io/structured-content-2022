import Link from "next/link";
import client from "../clients/mainClient";
import {formatDateWithTime} from "../util/date";
import SectionBlock from "../components/SectionBlock";
import Heading from "../components/Heading";

const QUERY = `
    *[_type == "event"][0] {
      name,
      description,
      tagline,
      startDate,
      endDate,
    }
  `;

interface HomeProps {
  data: {
    name: string;
    description: string;
    tagline: string;
    startDate: string;
    endDate: string;
  };
}

const Home = ({ data: { name, tagline, startDate, endDate, description } }: HomeProps) => (
  <>
    <SectionBlock>
      <header>
        <Heading>{name}</Heading>
        {tagline}
        <p>{formatDateWithTime(startDate)} - {formatDateWithTime(endDate)}</p>
      </header>
    </SectionBlock>

    <main>
      <SectionBlock>
        <Link href="#">{'Registration/Sign up/tickets ->'}</Link>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Why you should go/what this is</Heading>
        {description}
      </SectionBlock>
    </main>
  </>
);

export async function getStaticProps() {
  const data = await client.fetch(QUERY);
  console.log("DATA", data);
  return {
    props: {
      data,
    },
  };
}

export default Home;