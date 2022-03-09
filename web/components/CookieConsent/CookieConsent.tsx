import ReactCookieConsent from 'react-cookie-consent';
import styles from './CookieConsent.module.css';

export const CookieConsent = () => (
  <div className={styles.container}>
    <ReactCookieConsent
      buttonText="OK"
      declineButtonText="No, thanks"
      enableDeclineButton
      disableStyles
      containerClasses={styles.consentContainer}
      contentClasses={styles.consentContent}
      buttonWrapperClasses={styles.buttonWrapper}
      buttonClasses={styles.consentButton}
      declineButtonClasses={styles.declineButton}
    >
      We use cookies to see how you use our website and to show you related ads
      later.{' '}
      <a
        href="https://www.sanity.io/legal/privacy#2426b2eb5396"
        className={styles.link}
        target="_blank"
        rel="noreferrer"
      >
        Learn more
      </a>
    </ReactCookieConsent>
  </div>
);
