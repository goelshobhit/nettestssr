/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import React from 'react';
import { Provider } from 'react-redux';
import Head from 'next/head';
import withReduxStore from 'utils/with-redux-store';
import Script from 'next/script';
import { useRouter } from 'next/router';
import * as gtag from '../../src/utils/gtag';

import 'fontsource-metropolis';
import '@typefaces-pack/typeface-inter';
import '../../src/globals.css';
import '../../src/css/icons.css';
import 'antd/dist/antd.css';

const App = ({ Component, pageProps, reduxStore }) => {
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
      window.fbq('track', 'PageView');
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <React.StrictMode>
        <Head>
          <title>Vamp By Night Studio</title>
        </Head>

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        <Script id="facebook-pixel">
          {`
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', ${gtag.FB_PIXEL_ID});
        fbq('track', 'PageView');
      `}
        </Script>
        <Script id="hotjar">
          {`
        (function(h,o,t,j,a,r){
          h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
          h._hjSettings={hjid:2558252,hjsv:6};
          a=o.getElementsByTagName('head')[0];
          r=o.createElement('script');r.async=1;
          r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
          a.appendChild(r);
      })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=')
      `}
        </Script>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </React.StrictMode>
    </>
  );
};

export default withReduxStore(App);
