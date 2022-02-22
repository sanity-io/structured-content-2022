import GridWrapper from '../GridWrapper';
import Heading from '../Heading';
import PlaceholderImage from '../PlaceholderImage';
import styles from './ConferenceUpdatesForm.module.css';
import { PortableTextComponentProps } from "@portabletext/react";

type ConferenceUpdatesFormProps = {
  buttonText: string;
  heading: string;
  subheading?: string;
  id: string;
}

export const ConferenceUpdatesForm = ({ value: { buttonText, heading, id } }: PortableTextComponentProps<ConferenceUpdatesFormProps>) => (
  <GridWrapper>
    <article className={styles.container}>
      <PlaceholderImage width={330} height={459} className={styles.image} />

      <div className={styles.mainContents}>
        <Heading type="h2">{heading}</Heading>
        <form
          action="https://sanity.us3.list-manage.com/subscribe/post"
          method="POST"
          className={styles.form}
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
        <p className={styles.emailParagraph}>
          We&#39;ll only send you updates about the conference
        </p>
      </div>
    </article>
  </GridWrapper>
);
