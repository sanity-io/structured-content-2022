import GridWrapper from '../GridWrapper';
import Heading from '../Heading';
import Paragraph from '../Paragraph';
import PlaceholderImage from '../PlaceholderImage';
import styles from './ConferenceUpdatesForm.module.css';

export const ConferenceUpdatesForm = () => (
  <GridWrapper>
    <article className={styles.container}>
      <PlaceholderImage width={330} height={459} className={styles.image} />

      <div className={styles.mainContents}>
        <Heading type="h2">Get conference updates</Heading>
        <form
          action="https://sanity.us3.list-manage.com/subscribe/post"
          method="POST"
          className={styles.form}
        >
          <div className={styles.formContents}>
            <input type="hidden" name="u" value="3e99a07b5e03ed5b07a234a57" />
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
              aria-label="Sign up"
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
