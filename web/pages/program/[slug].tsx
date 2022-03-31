import type { GetStaticPaths, GetStaticProps } from 'next';
import { groq } from 'next-sanity';
import urlJoin from 'proper-url-join';
import Footer from '../../components/Footer';
import GridWrapper from '../../components/GridWrapper';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import Tag from '../../components/Tag';
import TextBlock from '../../components/TextBlock';
import { imageUrlFor } from '../../lib/sanity';
import client from '../../lib/sanity.server';
import { mainEventId } from '../../util/constants';
import type { Slug } from '../../types/Slug';
import type { Session } from '../../types/Session';
import {
  formatDateWithDay,
  formatTimeRange,
  getNonLocationTimezone,
} from '../../util/date';
import { sessionStart } from '../../util/session';
import styles from '../app.module.css';
import programStyles from './program.module.css';
import Link from 'next/link';

const QUERY = groq`
  {
    "session": *[_type == "session" && slug.current == $slug][0] {
      _id,
      title,
      duration,
      longDescription,
      speakers[] {
        role,
        person-> { _id, name, title, company, photo, slug },
      },
      type,
    },
    "home": *[_id == "${mainEventId}"][0] {
      "ticketsUrl": registrationUrl,
    },
    "footer": *[_id == "secondary-nav"][0] {
      "links": tree[].value.reference-> {
        "name": seo.title,
        slug,
        _id,
      }
    },
    "timeInfo": *[_id == "${mainEventId}"][0].venues[0]-> {
      "mainVenueTimezone": timezone,
      "currentSessionInProgram": *[_type == "program" && references(^._id)][0].sessions[] { 
        session-> 
      }[session.slug.current == $slug][0].session { _id, duration },
      "mainVenueSessions": *[_type == "program" && references(^._id)][0] {
        startDateTime,
        "sessions": *[_id == ^._id].sessions[] {
          "duration": coalesce(duration, session->.duration),
          "_id": session->._id,
        },
      }
    },  
  }`;

interface SessionRouteProps {
  data: {
    session: Session;
    home: {
      ticketsUrl: string;
    };
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
  };
  slug: string;
}

const SessionRoute = ({
  data: {
    session: { title, longDescription, speakers, type },
    home: { ticketsUrl },
    footer,
    timeInfo: {
      mainVenueTimezone,
      currentSessionInProgram,
      mainVenueSessions: { startDateTime, sessions },
    },
  },
  slug,
}: SessionRouteProps) => {
  const start = sessionStart(
    startDateTime,
    currentSessionInProgram?._id,
    sessions
  );
  return (
    <>
      <MetaTags title={title} description="" currentPath={`/session/${slug}`} />
      <header className={styles.header}>
        <Nav
          onFrontPage={false}
          currentPath={`/session/${slug}`}
          ticketsUrl={ticketsUrl}
        />
      </header>
      <main>
        <div className={programStyles.top}>
          <GridWrapper>
            <div className={programStyles.topContainer}>
              <div className={programStyles.sessionInfo}>
                {type === 'workshop' && (
                  <div className={programStyles.tag}>
                    <Tag>Workshop</Tag>
                  </div>
                )}
                <h1 className={programStyles.sessionTitle}>{title}</h1>

                {startDateTime && currentSessionInProgram && (
                  <>
                    <div>
                      {formatDateWithDay(start, mainVenueTimezone, ', ')}
                    </div>
                    <div>
                      {formatTimeRange(
                        start,
                        currentSessionInProgram.duration,
                        mainVenueTimezone
                      )}{' '}
                      {getNonLocationTimezone(start, mainVenueTimezone, true)}
                    </div>
                  </>
                )}
              </div>

              {speakers && (
                <ul className={programStyles.speakers}>
                  {speakers.map(
                    ({
                      role,
                      person: { _id, name, title, company, photo, slug },
                    }) => (
                      <li key={_id} className={programStyles.speaker}>
                        {photo && (
                          <Link href={urlJoin('/speakers', slug.current)}>
                            <a>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={imageUrlFor(photo)
                                  .size(64, 80)
                                  .saturation(-100)
                                  .url()}
                                width={64}
                                height={80}
                                alt={name}
                                className={programStyles.speakerImage}
                              />
                            </a>
                          </Link>
                        )}
                        <div>
                          <div className={programStyles.role}>{role}</div>
                          <Link href={urlJoin('/speakers', slug.current)}>
                            <a>
                              <strong className={programStyles.speakerName}>
                                {name}
                              </strong>
                            </a>
                          </Link>
                          <div>
                            {[title, company].filter(Boolean).join(', ')}
                          </div>
                        </div>
                      </li>
                    )
                  )}
                </ul>
              )}
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
