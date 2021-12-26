/**
 *
 * QuickStart
 *
 */

import React, { useEffect } from 'react';
import Head from 'next/head';

import QuickStart from 'containers/QuickStart';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';

export default function Home() {
  useEffect(() => {
    window.location.reload();
  }, []);
  return (
    <div>
      <Head>
        <title>Quick Start | Vamp By Night Studio</title>
        <meta property="og:title" content="Quick Start | Vamp ByNightStudio" />
        <meta
          name="description"
          content="Check with your Storyteller to determine if your chosen clan is common, uncommon, or rare in your game’s setting. If you wish to portray an uncommon or rare clan, you must use some of your initial XP to purchase a specific Rarity merit."
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
      <QuickStart />
      <Footer />
    </div>
  );
}
