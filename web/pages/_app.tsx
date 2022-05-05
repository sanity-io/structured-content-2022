import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';
import TagManager from 'react-gtm-module';
import CookieConsent from '../components/CookieConsent';
import favicon128x128 from '../images/favicon-128x128.png';
import favicon64x64 from '../images/favicon-64x64.png';
import favicon32x32 from '../images/favicon-32x32.png';
import favicon16x16 from '../images/favicon-16x16.png';
import '../styles/globals.css';
import styles from './app.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const hasConsent = getCookieConsentValue();
    if (
      hasConsent !== 'false' &&
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production' &&
      process.env.NEXT_PUBLIC_GTM_ID
    ) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="128x128"
          href={favicon128x128.src}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="64x64"
          href={favicon64x64.src}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={favicon32x32.src}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={favicon16x16.src}
        />
        <link
          rel="apple-touch-icon"
          sizes="128x128"
          href={favicon128x128.src}
        />
      </Head>
      <Component {...pageProps} />
      <div className={styles.cookieConsent}>
        <CookieConsent />
      </div>
    </>
  );
}

export default MyApp;
