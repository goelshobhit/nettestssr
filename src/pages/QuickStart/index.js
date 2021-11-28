/**
 *
 * QuickStart
 *
 */

import React from 'react';
import Head from 'next/head';

import QuickStart from 'containers/QuickStart';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';

export default function Home() {
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
          content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
      </Head>
      <Header />
      <QuickStart />
      <Footer />
    </div>
  );
}
