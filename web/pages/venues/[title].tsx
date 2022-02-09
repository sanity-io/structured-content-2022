import Link from 'next/link';
import client from '../../lib/sanity.server';
import { Venue } from '../../types/Venue';
import SectionBlock from '../../components/SectionBlock';
import Heading from '../../components/Heading';
import Paragraph from '../../components/Paragraph';
import sharedStyles from '../../pageResources/shared/shared.module.css';
import styles from '../../pageResources/about/venue/venue.module.css';

const QUERY = `
  *[_type == "venue"][title == $title][0] {
    title,
    geolocation
  }`;

interface VenueProps {
  data: Venue;
}

const mapUrl = (geolocation: { lat: number; lng: number }) =>
  `https://maps.google.com/maps?q=${geolocation.lat},${geolocation.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

const Venue = ({ data: { title, geolocation } }: VenueProps) => (
  <div className={sharedStyles.container}>
    <header>
      <SectionBlock>
        <Heading>{title}</Heading>
      </SectionBlock>
    </header>

    <main>
      <SectionBlock>
        <div className={styles.location}>
          <div>
            <Heading type="h2">Location</Heading>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. This text is not
              fetched from Sanity.
            </Paragraph>
          </div>
          <div className={styles.map}>
            {geolocation?.lat && geolocation?.lng && (
              <iframe src={mapUrl(geolocation)} />
            )}
          </div>
        </div>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Attendee details</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
      </SectionBlock>

      <SectionBlock>
        <Heading type="h2">Associated company/contact</Heading>
        <Paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit
          amet, consectetur adipiscing elit. This text is not fetched from
          Sanity.
        </Paragraph>
      </SectionBlock>

      <SectionBlock noBackground>
        <Paragraph>
          <Link href="#">{'See program for this venue ->'}</Link>
        </Paragraph>
      </SectionBlock>
    </main>
  </div>
);

export async function getServerSideProps({ params: { title } }) {
  const data = await client.fetch(QUERY, { title: title || '' });
  if (!data?.title) {
    return { notFound: true };
  }

  return { props: { data } };
}

export default Venue;
