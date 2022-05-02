import { useRef } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { PortableTextComponentProps } from '@portabletext/react';
import newsletterShapes from '../../images/newsletter-shapes.svg';
import useIntersection from '../../hooks/useIntersection';
import { useAnimationProperties } from '../../hooks/useAnimationProperties';
import GridWrapper from '../GridWrapper';
import styles from './ConferenceUpdatesForm.module.css';

type ConferenceUpdatesFormProps = {
  type: 'contact' | 'registration' | 'newsletter';
  id: string;
  buttonText: string;
  target?: string;
  redirect?: string;
};

export const ConferenceUpdatesForm = ({
  value: { type, id, buttonText, target, redirect },
}: PortableTextComponentProps<ConferenceUpdatesFormProps>) => {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isIntersecting = useIntersection(wrapperRef);

  const imageAnimation = useAnimationProperties();
  const headingAnimation = useAnimationProperties();
  const formAnimation = useAnimationProperties();
  const labelAnimation = useAnimationProperties();

  if (type !== 'newsletter') {
    console.error(`Unrecognized ConferenceUpdatesForm type: '${type}'`);
    return null;
  }

  return (
    <GridWrapper>
      <article
        className={clsx(
          styles.container,
          isIntersecting && styles.isIntersecting
        )}
        ref={wrapperRef}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={newsletterShapes.src}
          width={newsletterShapes.width}
          height={newsletterShapes.height}
          className={styles.image}
          style={imageAnimation}
          alt=""
        />

        <div className={styles.mainContents}>
          <h2 className={styles.heading} style={headingAnimation}>
            Get conference updates
          </h2>
          <form
            action={target}
            method="POST"
            className={styles.form}
            style={formAnimation}
            onSubmit={() => {
              if (redirect) {
                router.push(redirect);
              }
            }}
          >
            <div className={styles.formContents}>
              <input type="hidden" name="u" value={id} />
              <input type="hidden" name="id" value="cca563332b" />
              <input
                id="mce-EMAIL"
                name="EMAIL"
                type="email"
                placeholder="Your email address"
                aria-label="Your email address"
                required
                className={styles.emailInput}
              />
              <button
                type="submit"
                className={styles.submitButton}
                aria-label={buttonText}
              >
                -&gt;
              </button>
            </div>
          </form>
          <p className={styles.emailParagraph} style={labelAnimation}>
            We&#39;ll only send you updates about the conference
          </p>
        </div>
      </article>
    </GridWrapper>
  );
};
