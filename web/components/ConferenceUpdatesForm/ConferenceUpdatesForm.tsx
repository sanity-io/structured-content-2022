import Paragraph from '../Paragraph';
import PlaceholderImage from "../PlaceholderImage";
import Heading from "../Heading";
import styles from './ConferenceUpdatesForm.module.css';

export const ConferenceUpdatesForm = () => (
  <div className={styles.container}>
    <PlaceholderImage width={330} height={459}/>

    <div>
      <Heading type="h2">Get conference updates</Heading>
      <form
        action="https://sanity.us3.list-manage.com/subscribe/post"
        method="POST"
      >
        <input type="hidden" name="u" value="3e99a07b5e03ed5b07a234a57"/>
        <input type="hidden" name="id" value="cca563332b"/>
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
    </div>
  </div>
);
