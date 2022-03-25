import type { GetStaticPaths, GetStaticProps } from 'next';
import urlJoin from 'proper-url-join';
import { groq } from 'next-sanity';
import type { Person } from '../../types/Person';
import type { Slug } from '../../types/Slug';
import MetaTags from '../../components/MetaTags';
import Nav from '../../components/Nav';
import GridWrapper from '../../components/GridWrapper';
import Footer from '../../components/Footer';
import client from '../../lib/sanity.server';
import { mainEventId } from '../../util/constants';
import styles from '../app.module.css';
import TextBlock from '../../components/TextBlock';
import { imageUrlFor } from '../../lib/sanity';
import ConferenceUpdatesForm from '../../components/ConferenceUpdatesForm';
import Card from '../../components/Card';
import twitterLogo from '../../images/twitter_logo_black.svg';
import linkedinLogo from '../../images/linkedin_logo_black.svg';
import { SPEAKER } from '../../util/queries';
import { formatDateWithDay, formatTimeRange } from '../../util/date';
import articleStyles from '../article/article.module.css';
import speakerStyles from './speakers.module.css';

const QUERY = groq`
  {
    "speaker": *[_type == "person" && slug.current == $slug][0] { ${SPEAKER} },
    "ticketsUrl": *[_id == "${mainEventId}"][0].registrationUrl,
    "footer": *[_id == "secondary-nav"][0] {
      "links": tree[].value.reference-> {
        "name": seo.title,
        slug,
        _id,
      }
    },
  }`;

interface SpeakersRouteProps {
  data: {
    speaker: Person & {
      sessions?: {
        title: string;
        startTime: string;
        duration: number;
        timezone: string;
        _id: string;
      }[];
    };
    ticketsUrl: string;
    footer: {
      links: {
        name: string;
        slug: Slug;
        _id: string;
      }[];
    };
    rewrittenArticleSlugs?: string[];
  };
  slug: string;
}

const SpeakersRoute = ({
  data: {
    speaker: { bio, photo, name, pronouns, title, company, social, sessions },
    ticketsUrl,
    footer,
  },
  slug,
}: SpeakersRouteProps) => (
  <>
    <MetaTags
      title={`${name} – Structured Content 2022`}
      description={`Speaker page for ${name}`}
      currentPath={slug}
    />
    <header className={styles.header}>
      <Nav currentPath={`/speakers/${slug}`} ticketsUrl={ticketsUrl} />
    </header>
    <main>
      <GridWrapper>
        <div className={articleStyles.container}>
          <aside>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrlFor(photo).size(336, 480).saturation(-100).url()}
              alt={name}
              className={speakerStyles.speakerImage}
              width={336}
              height={480}
            />
          </aside>

          <div className={articleStyles.mainContent}>
            <>
              <h1>{name}</h1>
              <div>{pronouns}</div>
              <div>{[title, company].filter(Boolean).join(', ')}</div>
              {social && (
                <div className={speakerStyles.socialContainer}>
                  {social.twitter && (
                    <a
                      href={`https://twitter.com/${social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card>
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
                    </a>
                  )}
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Card>
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
                    </a>
                  )}
                </div>
              )}
            </>
            <div className={speakerStyles.sessionContainer}>
              {Array.isArray(sessions) &&
                sessions.map(
                  ({ _id, title, startTime, duration, timezone }) => (
                    <Card key={_id} className={speakerStyles.session}>
                      <h2 className={speakerStyles.sessionTitle}>{title}</h2>
                      <div>{formatDateWithDay(startTime, timezone)}</div>
                      <div>
                        {formatTimeRange(startTime, duration, timezone)}{' '}
                        {timezone}
                      </div>
                    </Card>
                  )
                )}
            </div>
            <TextBlock value={bio} />
          </div>
        </div>
        <ConferenceUpdatesForm
          value={{
            type: 'newsletter',
            id: 'newsletter-form',
            buttonText: 'Subscribe',
          }}
          index={0}
          isInline={false}
          renderNode={null}
        />
      </GridWrapper>
    </main>
    <Footer links={footer.links} />
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const allSlugsQuery = groq`*[defined(slug.current) && _type == 'person'][].slug.current`;
  const pages = await client.fetch(allSlugsQuery);
  const paths = pages
    .map((slug) => ({
      params: { slug: urlJoin(slug, { leadingSlash: false }) },
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
  if (!data?.speaker?._id) {
    return { notFound: true };
  }

  return { props: { data, slug } };
};

export default SpeakersRoute;
