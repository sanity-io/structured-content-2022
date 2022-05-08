import type { GetStaticPaths, GetStaticProps } from 'next';
import urlJoin from 'proper-url-join';
import { groq } from 'next-sanity';
import type { Person } from '../../types/Person';
import type { Slug } from '../../types/Slug';
import type { Session } from '../../types/Session';
import type { PrimaryNavItem } from '../../types/PrimaryNavItem';
import type { ProgramSession } from '../../types/Program';
import type { Section } from '../../types/Section';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import HighlightedSpeakerBlock from '../../components/HighlightedSpeakerBlock';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import SessionCard from '../../components/SessionCard';
import type { SessionCardProps } from '../../components/SessionCard';
import TextBlock from '../../components/TextBlock';
import client from '../../lib/sanity.server';
import { mainEventId, newsletterSharedSectionId } from '../../util/constants';
import twitterLogo from '../../images/twitter_logo_black.svg';
import linkedinLogo from '../../images/linkedin_logo_black.svg';
import { getOgImagePath } from '../../util/entityPaths';
import { getSlug } from '../../util/pages';
import { sessionStart } from '../../util/session';
import { PRIMARY_NAV, SPEAKER_WITH_SESSIONS } from '../../util/queries';
import styles from '../app.module.css';
import speakerStyles from './speakers.module.css';

const QUERY = groq`
  {
    "speaker": *[_type == "person" && slug.current == $slug && count(*[references(^._id)]) > 0][0] { ${SPEAKER_WITH_SESSIONS} },
    "ticketsUrl": *[_id == "${mainEventId}"][0].registrationUrl,
    "navItems": ${PRIMARY_NAV},
    "footer": *[_id == "secondary-nav"][0] {
      "links": tree[].value.reference-> {
        "name": seo.title,
        slug,
        _id,
      }
    },
    "newsletterSection": *[_id == "${newsletterSharedSectionId}"][0],
  }`;

type SpeakerSession = {
  session: Pick<Session, '_id' | '_type' | 'title' | 'duration' | 'slug'>;
  programContainingSession: {
    programStart: string;
    sessions: {
      _id: string;
      duration: number;
    }[];
    venueTimezone: string;
  };
};

interface SpeakersRouteProps {
  data: {
    speaker: Person & {
      sessions: SpeakerSession[];
    };
    ticketsUrl: string;
    navItems?: PrimaryNavItem[];
    footer: {
      links: {
        name: string;
        slug: Slug;
        _id: string;
      }[];
    };
    newsletterSection: Section;
  };
  slug: string;
}

const socialLinkProps = (url: string) => ({
  href: url,
  target: '_blank',
  rel: 'noopener noreferrer',
});

const toSessionCardProps = (sessions: SpeakerSession[]): SessionCardProps[] =>
  sessions
    .filter(({ programContainingSession }) => Boolean(programContainingSession))
    .map(
      ({
        session,
        programContainingSession: { programStart, sessions, venueTimezone },
      }) => ({
        ...session,
        timezone: venueTimezone,
        sessionStart: sessionStart(programStart, session._id, sessions),
      })
    )
    .sort(
      (a, b) =>
        (a.sessionStart?.getTime() || -1) - (b.sessionStart?.getTime() || -1)
    );

const SpeakersRoute = ({
  data: {
    speaker: { bio, photo, name, pronouns, title, company, social, sessions },
    ticketsUrl,
    navItems,
    footer,
    newsletterSection,
  },
  slug,
}: SpeakersRouteProps) => (
  <>
    <MetaTags
      title={`${name} – Structured Content 2022`}
      description={`Speaker page for ${name}`}
      currentPath={`/speakers/${slug}`}
      image={photo}
      fallbackImage={{ url: getOgImagePath(name), alt: name }}
    />
    <header className={styles.header}>
      <Nav
        currentPath={`/speakers/${slug}`}
        ticketsUrl={ticketsUrl}
        items={navItems}
      />
    </header>
    <main className={speakerStyles.container}>
      <GridWrapper>
        <div className={speakerStyles.article}>
          <div className={speakerStyles.mainContent}>
            <div className={speakerStyles.summary}>
              <h1 className={speakerStyles.name}>{name}</h1>
              <div>{pronouns}</div>
              <div>{[title, company].filter(Boolean).join(', ')}</div>
            </div>
            {social && (
              <ul className={speakerStyles.socialContainer}>
                {social.twitter && (
                  <li className={speakerStyles.socialItem}>
                    <Card
                      linkProps={socialLinkProps(
                        urlJoin('https://twitter.com', social.twitter)
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={twitterLogo.src}
                        alt="Twitter"
                        width={18}
                        height={18}
                        className={speakerStyles.socialImage}
                      />
                      {social.twitter}
                    </Card>
                  </li>
                )}
                {social.linkedin && (
                  <li className={speakerStyles.socialItem}>
                    <Card linkProps={socialLinkProps(social.linkedin)}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={linkedinLogo.src}
                        alt="LinkedIn"
                        width={18}
                        height={18}
                        className={speakerStyles.socialImage}
                      />
                      {urlJoin(social.linkedin, { trailingSlash: false })
                        .split('/')
                        .pop()}
                    </Card>
                  </li>
                )}
              </ul>
            )}
            <div className={speakerStyles.speakerImage}>
              <HighlightedSpeakerBlock photo={photo} />
            </div>
            <ul className={speakerStyles.sessionContainer}>
              {Array.isArray(sessions) &&
                toSessionCardProps(sessions).map((session, index) => (
                  <li key={index}>
                    <SessionCard {...session} />
                  </li>
                ))}
            </ul>
            <div className={speakerStyles.bio}>
              <TextBlock value={bio} />
            </div>
          </div>
        </div>
      </GridWrapper>
    </main>
    <TextBlock value={newsletterSection} />
    <Footer links={footer.links} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'person'][].slug.current`;
  const pages = await client.fetch(allSlugsQuery);
  const paths = pages
    .map((slug: string) => ({
      params: { slug: urlJoin(slug, { leadingSlash: false }) },
    }))
    .filter(({ params: { slug } }: { params: { slug: string } }) =>
      Boolean(slug)
    );

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = getSlug(params);
  const data = await client.fetch(QUERY, { slug });
  if (!data?.speaker?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default SpeakersRoute;
