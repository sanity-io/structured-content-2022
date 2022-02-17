import { useEffect, useState } from 'react';
import { getCookieConsentValue } from 'react-cookie-consent';
import TagManager from 'react-gtm-module';
import clsx from 'clsx';
import CookieConsent from '../components/CookieConsent';
import Nav from '../components/Nav';
import '../styles/globals.css';
import styles from './app.module.css';

function MyApp({ Component, pageProps, router }) {
  const [scrollTop, setScrollTop] = useState(
    typeof document !== 'undefined' ? document.documentElement.scrollTop : 0
  );

  useEffect(() => {
    const hasConsent = getCookieConsentValue();
    if (
      hasConsent !== 'false' &&
      process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
    ) {
      TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_ID });
    }
  }, []);

  /* This is a hack. What we really want is to enable the menu once we've
   * scrolled past the top logo on the front page. Probably a better way would
   * be to give the page a callback so it can use IntersectionObserver and
   * notify us when the right elements have appeared/disappeared from view.
   */
  const scrollPositionTriggeringFrontPageMenu = 420;

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, [scrollTop]);

  const isFrontPage = router.asPath === '/home' || router.asPath === '/';
  const scrolledFarEnough = scrollTop > scrollPositionTriggeringFrontPageMenu;
  const headerClasses = clsx(
    styles.header,
    isFrontPage && styles.onFrontPage,
    isFrontPage && scrolledFarEnough && styles.onScrolledFrontPage
  );

  return (
    <>
      <header className={headerClasses}>
        <Nav />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <div className={styles.cookieConsent}>
        <CookieConsent />
      </div>
    </>
  );
}

export default MyApp;
