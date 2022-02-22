import Link from 'next/link';
import client from '../lib/sanity.server';
import SectionBlock from '../components/SectionBlock';
import Heading from '../components/Heading';
import sponsorStyles from '../pageResources/sponsor/Sponsor.module.css';
import Paragraph from '../components/Paragraph';
import GridWrapper from '../components/GridWrapper';

const QUERY = `{}`;

interface SponsorProps {
  data: {};
}

const Sponsor = ({ data: {} }: SponsorProps) => (
  <GridWrapper>
    <SectionBlock>
      <Heading>Sponsor partner</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. This text is not fetched from Sanity.
      </Paragraph>

      <Link href="#signUp">
        <a>{'Sign up ->'}</a>
      </Link>
    </SectionBlock>

    <SectionBlock>
      <Heading type="h2">Lorem ipsum</Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. This text is not fetched from Sanity.
      </Paragraph>
    </SectionBlock>

    <SectionBlock>
      <table className={sponsorStyles.table}>
        <thead>
          <tr>
            <th />
            <th>Premier</th>
            <th>Gold</th>
            <th>Silver</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Description</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>✅</td>
            <td>✅</td>
            <td />
          </tr>
          <tr>
            <td>Description</td>
            <td>✅</td>
            <td>✅</td>
            <td />
          </tr>
          <tr>
            <td>Description</td>
            <td>✅</td>
            <td />
            <td />
          </tr>
          <tr>
            <td>Description</td>
            <td>✅</td>
            <td />
            <td />
          </tr>
          <tr>
            <td>Description</td>
            <td>✅</td>
            <td />
            <td />
          </tr>
        </tbody>
      </table>
    </SectionBlock>

    <SectionBlock>
      <Heading type="h2" id="signUp">
        Sign up
      </Heading>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. This text is not fetched from Sanity.
      </Paragraph>

      <form
        className={sponsorStyles.form}
        onSubmit={() => alert('This form is not yet implemented.')}
      >
        <label htmlFor="company">Your company</label>
        <input type="text" name="company" />

        <label htmlFor="name">Your name</label>
        <input type="text" name="name" />

        <label htmlFor="mail">Email</label>
        <input type="email" />

        <button type="submit" className={sponsorStyles.button}>
          Submit
        </button>
      </form>
    </SectionBlock>
  </GridWrapper>
);

export async function getStaticProps() {
  return {
    props: {
      data: await client.fetch(QUERY),
    },
    revalidate: 180,
  };
}

export default Sponsor;
