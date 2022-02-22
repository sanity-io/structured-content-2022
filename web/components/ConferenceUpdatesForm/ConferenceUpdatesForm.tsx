import Paragraph from '../Paragraph';
import PlaceholderImage from '../PlaceholderImage';
import Heading from '../Heading';
import styles from './ConferenceUpdatesForm.module.css';
import { PortableTextComponentProps } from "@portabletext/react";

type ConferenceUpdatesFormProps = {
  buttonText: string;
  heading: string;
  subheading?: string;
  id: string;
}

export const ConferenceUpdatesForm = ({ value: { buttonText, heading, id } }: PortableTextComponentProps<ConferenceUpdatesFormProps>) => (
    <div className={styles.container}>
      <PlaceholderImage width={330} height={459}/>

      <div>
        <Heading type="h2">Get conference updates</Heading>
        <form
          action="https://sanity.us3.list-manage.com/subscribe/post"
          method="POST"
        >
          <input type="hidden" name="u" value={id}/>
          <input type="hidden" name="id" value="cca563332b"/>
          <div>
            <input
              id="mce-EMAIL"
              name="EMAIL"
              type="email"
              placeholder={heading}
              required
              className={styles.emailInput}
            />
            <button type="submit" className={styles.submitButton}>{buttonText}</button>
          </div>
        </form>
        <Paragraph className={styles.emailParagraph}>
          We&#39;ll only send you updates about the conference
        </Paragraph>
      </div>
    </div>
  );
