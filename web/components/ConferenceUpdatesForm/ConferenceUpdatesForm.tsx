import { PortableTextComponentProps } from '@portabletext/react';
import GridWrapper from '../GridWrapper';
import PlaceholderImage from '../PlaceholderImage';
import styles from './ConferenceUpdatesForm.module.css';
import { useRouter } from "next/router";

type ConferenceUpdatesFormProps = {
  type: 'contact' | 'registration' | 'newsletter';
  id: string;
  buttonText: string;
  target?: string;
  redirect?: string;
};

export const ConferenceUpdatesForm = ({
  value: { type, id, buttonText, target, redirect  },
}: PortableTextComponentProps<ConferenceUpdatesFormProps>) => {
  const router = useRouter();

  if (type !== 'newsletter') {
    console.error(`Unrecognized ConferenceUpdatesForm type: '${type}'`);
    return null;
  }

  return (
    <GridWrapper>
      <article className={styles.container}>
        <PlaceholderImage width={330} height={459} className={styles.image}/>

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
              <input type="hidden" name="u" value={id}/>
              <input type="hidden" name="id" value="cca563332b"/>
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
};
