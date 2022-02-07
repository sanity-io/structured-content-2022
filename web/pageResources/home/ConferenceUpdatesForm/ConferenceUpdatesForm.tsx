import styles from './ConferenceUpdatesForm.module.css';
import Paragraph from '../../../components/Paragraph';

export const ConferenceUpdatesForm = () => (
  <>
    <form
      action="https://sanity.us3.list-manage.com/subscribe/post"
      method="POST"
    >
      <input type="hidden" name="u" value="3e99a07b5e03ed5b07a234a57" />
      <input type="hidden" name="id" value="cca563332b" />
      <div>
        <input
          id="mce-EMAIL"
          name="EMAIL"
          type="email"
          placeholder="Email address"
          required
          className={styles.emailInput}
        />
        <button type="submit" className={styles.submitButton}>
          Sign up
        </button>
      </div>
    </form>
    <Paragraph className={styles.emailParagraph}>
      We&#39;ll only send you updates about the conference
    </Paragraph>
  </>
);
