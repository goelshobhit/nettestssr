/**
 *
 * QuickStart
 *
 */

import React, { useEffect } from 'react';
import Head from 'next/head';

import SupportUs from 'containers/SupportUs';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';

export default function QuickStart() {
  return (
    <div>
      <Head>
        <title>Support Us | Vamp By Night Studios</title>
        <meta property="og:title" content="Quick Start | Vamp ByNightStudio" />
        <meta
          name="description"
          content="We welcome suggestions, donations, ideas, and more!  We will be launching a Patreon style support system for this in the future as well to support content, features, and other additions!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg"
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="1 days" />
      </Head>
      <Header />
      <SupportUs />
      <Footer />
    </div>
  );
}

QuickStart.propTypes = {
  ...QuickStart,
};
