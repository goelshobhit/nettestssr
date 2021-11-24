import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

import { Global, css } from '@emotion/react';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const page = ctx.renderPage();
    // extract css to render in SSR
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, ...page };
  }

  render() {
    return (
      <Html>
        <Global
          styles={css`
            ::selection {
              background-color: #26bd5a;
              color: #fff;
            }
            body,
            html {
              margin: 0;
              padding: 0;
              font-family: 'Inter';
            }
          `}
        />

        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon.ico" />
          <link rel="icon" type="image/ico" sizes="32x32" href="/favicon.ico" />
          <link rel="icon" type="image/ico" sizes="16x16" href="/favicon.ico" />
          <link rel="manifest" href="/static/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/favicon.ico" color="#000000" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
          <meta name="theme-color" content="#000" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
