import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import ticketsStyles from '../pageResources/tickets/Tickets.module.css';
import styles from '../pageResources/shared/shared.module.css';
import Nav from '../components/Nav';
import { RichTextSection } from '../types/RichTextSection';
import TextBlock from '../components/TextBlock';

const QUERY = `
  {
    "tickets": *[_type == "ticket"] {
      _id,
      price,
      type,
      included,
    },
    "registrationInfo": *[_id == "8e0a4c73-2b2a-43c9-84a4-7a00c286aa86"][0] {
      name,
      sections
    }
  }`;

interface TicketsProps {
  data: {
    tickets: {
      _id: string;
      price: number;
      type: string;
      included?: string[];
    }[];
    registrationInfo: {
      name: string;
      sections: RichTextSection[];
    };
  };
}

const Tickets = ({
  data: {
    tickets,
    registrationInfo: { name, sections },
  },
}: TicketsProps) => (
  <div className={styles.container}>
    <header>
      <Nav />
      <SectionBlock>
        <Heading>Tickets</Heading>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock noBackground>
        <div className={ticketsStyles.container}>
          {tickets.map((ticket) => (
            <div key={ticket._id} className={ticketsStyles.ticket}>
              <div className={ticketsStyles['ticket__type']}>{ticket.type}</div>
              <div className={ticketsStyles['ticket__price']}>
                <span className={ticketsStyles['ticket__price__currency']}>
                  $
                </span>
                <span className={ticketsStyles['ticket__price__amount']}>
                  {ticket.price}
                </span>
              </div>
              <div className={ticketsStyles['ticket__included']}>
                {ticket.included?.map((included) => (
                  <div
                    key={included}
                    className={ticketsStyles['ticket__included__item']}
                  >
                    {included}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
      <SectionBlock>
        <Heading>{name}</Heading>
      </SectionBlock>
      <TextBlock value={sections} />
    </main>
  </div>
);

export async function getStaticProps() {
  return {
    props: {
      data: await client.fetch(QUERY),
    },
    revalidate: 180,
  };
}

export default Tickets;
