import { useEffect } from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';
import TagManager from 'react-gtm-module';
import CookieConsent from '../components/CookieConsent';
import Nav from '../components/Nav';
import '../styles/globals.css';

function MyApp({ Component, pageProps, router }) {
  useEffect(() => {
    const hasConsent = getCookieConsentValue();
    if (
      hasConsent !== 'false' &&
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  return (
    <>
      <header>
        <Nav />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <CookieConsent />
    </>
  );
}

export default MyApp;
