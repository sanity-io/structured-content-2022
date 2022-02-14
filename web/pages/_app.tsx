import { useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import TagManager from 'react-gtm-module';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
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
      <Component {...pageProps} />
      <div className="fixed bottom-0 w-full bg-black">
        <CookieConsent
          buttonText="OK"
          declineButtonText="No, thanks"
          enableDeclineButton
          disableStyles
          containerClasses="flex flex-col p-4 lg:px-0 text-gray-300 md:flex-row md:items-center md:justify-between max-w-[52rem] mx-auto"
          contentClasses="md:max-w-md"
          buttonWrapperClasses="flex mt-4 space-x-4 md:space-x-6 md:mt-0"
          buttonClasses="flex-1 px-4 md:px-6 py-2 text-red-900 bg-red-400 border border-red-400 hover:bg-red-300 md:flex-auto"
          declineButtonClasses="flex-1 px-4 py-2 border border-gray-800 hover:bg-gray-950 md:flex-auto"
        >
          We use cookies to see how you use our website and to show you related
          ads later.{' '}
          <a
            href="https://www.sanity.io/legal/privacy#2426b2eb5396"
            className="text-red-400 hover:text-red-300 whitespace-nowrap"
            target="_blank"
            rel="noreferrer"
          >
            Learn more →
          </a>
        </CookieConsent>
      </div>
    </>
  );
}

export default MyApp;
