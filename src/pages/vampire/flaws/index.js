import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/FlawsDetails';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import clanMock from 'scripts/clans.json';
import flaws_1 from 'scripts/flaws_0.json';
import flaws_2 from 'scripts/flaws_100.json';
import flaws_3 from 'scripts/flaws_200.json';

export default function Home() {

  const contentful_discipline_1 = extractEntryDataFromResponse(flaws_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(flaws_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(flaws_3);

  const clanAppData = extractEntryDataFromResponse(clanMock);
  const clanData = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

  const data = orderBy(
    concat(contentful_discipline_1, contentful_discipline_2, contentful_discipline_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const apps = {
    flaws: { data: data },
    clans: { data: clanData },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Flaws | Vamp ByNightStudio</title>
          <meta property="og:title" content="Flaws | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Flaws are disadvantages that pose challenges to a
            character’s nightly existence and provide a player a few
            extra experience points (XP) to spend elsewhere on her
            sheet. If you don’t see any that suit your character, you
            can create your character and play without adding any to
            your sheet. Flaws add up to 7 XP to your character, but also
            give that character a notable disadvantage in the game.
            Flaws are designed to be interesting, signifi cant, and to
            exemplify your character’s troubled past or personal
            prohibitions. You should try to roleplay your character’s
            flaws as much as possible, helping the Storyteller create a
            rich and detailed chronicle. Perfect people are no fun to
            roleplay, and characters with authentic-feeling traumas,
            biases, and failings bring life and vibrancy to the game."
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
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Organisation',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'United States',
                  addressRegion: 'New Orleans',
                  postalCode: '70116',
                  streetAddress: '1228 Royal St, New Orleans, LA 70116, United States',
                },
                email: 'mailto:support@bynightstudios.com',
                jobTitle: 'Organisation Product',
                name: 'Vamp BYNightStudio',
                url: 'https://bynightstudios.com/',
                sameAs: ['https://bit.ly/3D1e7vA'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', bestRating: '5', ratingCount: '54' },
                logo:
                  'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
                image:
                  'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
              }),
            }}
          />
        </Head>
        <div className="container main-content">
          <Disciplines app={apps} pageData={null} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

function getItems(item) {
  if (item.title) {
    return item.title;
  }
  if (item.merit) {
    return item.merit;
  }
  if (item.flaw) {
    return item.flaw;
  }

  if (item.technique) {
    return item.technique;
  }
  return item.attribute;
}
