import type { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import clsx from 'clsx';
import urlJoin from 'proper-url-join';
import { toPlainText } from '@portabletext/react';
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
import { getEntityPath, getOgImagePath } from '../../util/entityPaths';
import { getSlug } from '../../util/pages';
import { PRIMARY_NAV, PROGRAM, SPEAKER } from '../../util/queries';
import type { Person } from '../../types/Person';
import type { PrimaryNavItem } from '../../types/PrimaryNavItem';
import type { Program } from '../../types/Program';
import type { Slug } from '../../types/Slug';
import type { Session } from '../../types/Session';
import { sessionTimingDetailsForMatchingPrograms } from '../../util/session';
import styles from '../app.module.css';
import programStyles from './program.module.css';
import YouTubeBlock from '../../components/YouTubeBlock';

const QUERY = groq`
  {
    "session": *[_type == "session" && slug.current == $slug][0] {
      _id,
      title,
      duration,
      shortDescription,
      longDescription,
      videoURL,
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
      const personPhotoSrc =
        photo && imageUrlFor(photo).size(64, 80).saturation(-100).url();
      return (
        <li key={_id} className={programStyles.speakerItem}>
          <Link href={getEntityPath(speaker.person)}>
            <a className={programStyles.speakerLink}>
              {personPhotoSrc && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={personPhotoSrc}
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
    session: {
      title,
      shortDescription,
      longDescription,
      speakers,
      type,
      _id,
      videoURL,
      slideURL,
    },
    home: { ticketsUrl },
    navItems,
    footer,
    programs,
  },
  slug,
}: SessionRouteProps) => {
  const hasHighlightedSpeakers =
    speakers?.length && [1, 2].includes(speakers.length);
  return (
    <>
      <MetaTags
        title={title || ''}
        description={shortDescription ? toPlainText(shortDescription) : ''}
        currentPath={`/session/${slug}`}
        fallbackImage={{ url: getOgImagePath(title), alt: title || '' }}
      />
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
              <div className={programStyles.info}>
                {type === 'workshop' && (
                  <div className={programStyles.tag}>
                    <Tag>Workshop</Tag>
                  </div>
                )}
                <h1 className={programStyles.title}>{title}</h1>

                <ul className={programStyles.venueTimes}>
                  {sessionTimingDetailsForMatchingPrograms(programs, _id).map(
                    ({ label, time, timezone, rawDate, date, duration }) => (
                      <li className={programStyles.venueTime} key={label}>
                        <strong>{label}</strong>
                        <time dateTime={rawDate}>{date}</time>
                        <time dateTime={duration}>
                          {time} {timezone}
                        </time>
                      </li>
                    )
                  )}
                </ul>
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
          <div className={programStyles.video}>
            {videoURL && <YouTubeBlock url={videoURL} />}
          </div>
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
  if (!data?.session?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default SessionRoute;
