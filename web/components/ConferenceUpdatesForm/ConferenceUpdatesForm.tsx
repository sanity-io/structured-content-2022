import { useRouter } from 'next/router';
import { PortableTextComponentProps } from '@portabletext/react';
import GridWrapper from '../GridWrapper';
import PlaceholderImage from '../PlaceholderImage';
import styles from './ConferenceUpdatesForm.module.css';

type ConferenceUpdatesFormProps = {
  type: 'contact' | 'registration' | 'newsletter';
  id: string;
  buttonText: string;
  target?: string;
  redirect?: string;
};

const MAILCHIMP_CONTACT_US_FORM_SRC =
  'https://us3.list-manage.com/contact-form?u=3e99a07b5e03ed5b07a234a57&form_id=773cd394d3081648e28d54771f884aa8';

export const ConferenceUpdatesForm = ({
  value: { type, id, buttonText, target, redirect },
}: PortableTextComponentProps<ConferenceUpdatesFormProps>) => {
  const router = useRouter();

  if (type === 'contact') {
    return (
      <iframe
        src={MAILCHIMP_CONTACT_US_FORM_SRC}
        title="Contact Us Form"
        className={styles.contactUs}
        scrolling="no"
      />
    );
  }

  if (type === 'newsletter') {
    return (
      <GridWrapper>
        <article className={styles.container}>
          <PlaceholderImage width={330} height={459} className={styles.image} />

          <div className={styles.mainContents}>
            <form
              action={target}
              method="POST"
              className={styles.form}
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
            <p className={styles.emailParagraph}>
              We&#39;ll only send you updates about the conference
            </p>
          </div>
        </article>
      </GridWrapper>
    );
  }

  console.error(`Unrecognized ConferenceUpdatesForm type: '${type}'`);
  return null;
};
