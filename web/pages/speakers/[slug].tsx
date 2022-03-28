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
import TextBlock from '../../components/TextBlock';
import { imageUrlFor } from '../../lib/sanity';
import ConferenceUpdatesForm from '../../components/ConferenceUpdatesForm';
import Card from '../../components/Card';
import Shape from "../../components/Shape";
import twitterLogo from '../../images/twitter_logo_black.svg';
import linkedinLogo from '../../images/linkedin_logo_black.svg';
import { SPEAKER } from '../../util/queries';
import { formatDateWithDay, formatTimeDuration, formatTimeRange } from '../../util/date';
import styles from '../app.module.css';
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

const socialLinkProps = (url: string) => ({
  href: url,
  target: '_blank',
  rel: 'noopener noreferrer',
});

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
    <main className={speakerStyles.container}>
      <GridWrapper>
        <article className={speakerStyles.article}>
          <aside className={speakerStyles.aside}>
            <div className={speakerStyles.asideColumn}>
              <Shape />
              <Shape />
              <Shape className={speakerStyles.shapeColumnClip} />
            </div>
            <div className={speakerStyles.asideColumn}>
              <Shape />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrlFor(photo).size(336, 480).saturation(-100).url()}
                alt={name}
                className={speakerStyles.speakerImage}
                width={336}
                height={480}
              />
              <Shape className={speakerStyles.speakerImageColumnClip} />
            </div>
          </aside>

          <div className={speakerStyles.mainContent}>
            <>
              <h1>{name}</h1>
              <div>{pronouns}</div>
              <div>{[title, company].filter(Boolean).join(', ')}</div>
              {social && (
                <div className={speakerStyles.socialContainer}>
                  {social.twitter && (
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
                  )}
                  {social.linkedin && (
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
                        <div>
                          <time dateTime={startTime}>{formatDateWithDay(startTime, timezone)}</time>
                        </div>
                        <div>
                          <time dateTime={formatTimeDuration(startTime, duration)}>
                            {formatTimeRange(startTime, duration, timezone)}{' '}
                            {timezone}
                          </time>
                        </div>
                      </Card>
                    )
                )}
            </div>
            <TextBlock value={bio} />
          </div>
        </article>
      </GridWrapper>
    </main>
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
