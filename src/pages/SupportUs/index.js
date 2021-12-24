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
  useEffect(() => {
    window.location.reload();
  }, []);

  return (
    <div>
      <Head>
        <title>Support Us | Vamp By Night Studio</title>
        <meta property="og:title" content="Quick Start | Vamp ByNightStudio" />
        <meta
          name="description"
          content="We welcome suggestions, donations, ideas, and more!  We will be launching a Patreon style support system for this in the future as well to support content, features, and other additions!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
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
