import type { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import clsx from 'clsx';
import urlJoin from 'proper-url-join';
import Link from 'next/link';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import SessionSpeakers from '../../components/SessionSpeakers';
import Tag from '../../components/Tag';
import TextBlock from '../../components/TextBlock';
import { imageUrlFor } from '../../lib/sanity';
import client from '../../lib/sanity.server';
import { mainEventId } from '../../util/constants';
import { getEntityPath } from '../../util/entityPaths';
import { PRIMARY_NAV, PROGRAM, SPEAKER } from '../../util/queries';
import type { Person } from '../../types/Person';
import type { PrimaryNavItem } from '../../types/PrimaryNavItem';
import type { Program } from '../../types/Program';
import type { Slug } from '../../types/Slug';
import type { Session } from '../../types/Session';
import { sessionTimingDetailsForMatchingPrograms } from '../../util/session';
import styles from '../app.module.css';
import programStyles from './program.module.css';

const QUERY = groq`
  {
    "session": *[_type == "session" && slug.current == $slug][0] {
      _id,
      title,
      duration,
      longDescription,
      speakers[] {
        role,
        person-> { ${SPEAKER} },
      },
      type,
    },
    "home": *[_id == "${mainEventId}"][0] {
      "ticketsUrl": registrationUrl,
    },
    "navItems": ${PRIMARY_NAV},
    "footer": *[_id == "secondary-nav"][0] {
      "links": tree[].value.reference-> {
        "name": seo.title,
        slug,
        _id,
      }
    },
    "programs": *[_id == "${mainEventId}"].venues[]-> {
      "program": *[_type == "program" && references(^._id)] { ${PROGRAM} }
    }["program"][],
  }`;

interface SessionRouteProps {
  data: {
    session: Session;
    home: {
      ticketsUrl: string;
    };
    navItems?: PrimaryNavItem[];
    footer: {
      links: {
        name: string;
        slug: Slug;
        _id: string;
      }[];
    };
    timeInfo: {
      mainVenueTimezone: string;
      currentSessionInProgram?: Pick<Session, '_id' | 'duration'>;
      mainVenueSessions: {
        startDateTime: string;
        sessions: Pick<Session, '_id' | 'duration'>[];
      };
    };
    programs: Program[];
  };
  slug: string;
}

interface SpeakerListProps {
  speakers: {
    role: string;
    person: Person;
  }[];
}

const SpeakerList = ({ speakers }: SpeakerListProps) => (
  <ul className={programStyles.speakers}>
    {speakers.map((speaker) => {
      const {
        role,
        person: { _id, name, title, company, photo },
      } = speaker;
      return (
        <li key={_id} className={programStyles.speakerItem}>
          <Link href={getEntityPath(speaker.person)}>
            <a className={programStyles.speakerLink}>
              {photo && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={imageUrlFor(photo).size(64, 80).saturation(-100).url()}
                  width={64}
                  height={80}
                  alt={name}
                  className={programStyles.speakerImage}
                />
              )}
              <div>
                <div className={programStyles.role}>{role}</div>
                <strong className={programStyles.speakerName}>{name}</strong>
                <div>{[title, company].filter(Boolean).join(', ')}</div>
              </div>
            </a>
          </Link>
        </li>
      );
    })}
  </ul>
);

const SessionRoute = ({
  data: {
    session: { title, longDescription, speakers, type, _id },
    home: { ticketsUrl },
    navItems,
    footer,
    programs,
  },
  slug,
}: SessionRouteProps) => {
  const hasHighlightedSpeakers =
    speakers?.length === 1 || speakers?.length === 2;

  const matchingSessionsInPrograms = sessionTimingDetailsForMatchingPrograms(
    programs,
    _id
  ).map(({ label, ...rest }) => ({
    // Ad-hoc override for the SF venue, for this specific view only
    label: label === 'San Francisco' ? 'San Francisco & Virtual' : label,
    ...rest,
  }));
  return (
    <>
      <MetaTags title={title} description="" currentPath={`/session/${slug}`} />
      <header className={styles.header}>
        <Nav
          currentPath={`/session/${slug}`}
          ticketsUrl={ticketsUrl}
          items={navItems}
        />
      </header>
      <main>
        <div
          className={clsx(
            programStyles.top,
            hasHighlightedSpeakers && programStyles.hasHighlightedSpeakers
          )}
        >
          <GridWrapper>
            <div className={programStyles.topContainer}>
              <div className={programStyles.sessionInfo}>
                {type === 'workshop' && (
                  <div className={programStyles.tag}>
                    <Tag>Workshop</Tag>
                  </div>
                )}
                <h1 className={programStyles.sessionTitle}>{title}</h1>

                {matchingSessionsInPrograms.map(
                  ({ time, label, timezone, date }) => (
                    <p key={time}>
                      <strong>{label}</strong>
                      <span className={programStyles.sessionVenueDateTime}>
                        {date}
                      </span>
                      <span className={programStyles.sessionVenueDateTime}>
                        {time} {timezone}
                      </span>
                    </p>
                  )
                )}
              </div>

              {speakers &&
                (hasHighlightedSpeakers ? (
                  <div className={programStyles.highlightedSpeakers}>
                    <SessionSpeakers
                      speaker1={speakers[0].person}
                      speaker2={speakers[1]?.person}
                    />
                  </div>
                ) : (
                  <SpeakerList speakers={speakers} />
                ))}
            </div>
          </GridWrapper>
        </div>
        <GridWrapper>
          <div className={programStyles.longDescription}>
            <TextBlock value={longDescription} />
          </div>
        </GridWrapper>
      </main>
      <Footer links={footer.links} />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'session'][].slug.current`;
  const pages = await client.fetch(allSlugsQuery);
  const paths = pages
    .map((slug) => ({
      params: {
        slug: urlJoin(slug, { leadingSlash: false }),
      },
    }))
    .filter(({ params: { slug } }) => Boolean(slug));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({
  params: { slug: slugParam },
}) => {
  const slug = Array.isArray(slugParam)
    ? urlJoin.apply(null, [...slugParam, { leadingSlash: false }])
    : slugParam;
  const data = await client.fetch(QUERY, { slug });
  if (!data?.session?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default SessionRoute;
