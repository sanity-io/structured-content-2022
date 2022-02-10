import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import ticketsStyles from '../pageResources/tickets/Tickets.module.css';
import styles from '../pageResources/shared/shared.module.css';
import Nav from '../components/Nav';

const QUERY = `
  {
    "tickets": *[_type == "ticket"] {
      _id,
      price,
      type,
      included,
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
  }
}

const Tickets = ({ data: { tickets } }: TicketsProps) => (
  <div className={styles.container}>
    <header>
      <Nav/>
      <SectionBlock>
        <Heading>Tickets</Heading>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock noBackground>
        <div className={ticketsStyles.container}>
          {tickets.map(ticket => (
            <div key={ticket._id} className={ticketsStyles.ticket}>
              <div className={ticketsStyles["ticket__type"]}>{ticket.type}</div>
              <div className={ticketsStyles["ticket__price"]}>
                <span className={ticketsStyles["ticket__price__currency"]}>$</span>
                <span className={ticketsStyles["ticket__price__amount"]}>{ticket.price}</span>
              </div>
              <div className={ticketsStyles["ticket__included"]}>
                {ticket.included?.map(included => (
                  <div key={included} className={ticketsStyles["ticket__included__item"]}>
                    {included}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionBlock>
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
