import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/Disciplines';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import discipline_1 from 'scripts/discipline_0.json';
import discipline_2 from 'scripts/discipline_100.json';
import discipline_3 from 'scripts/discipline_200.json';
import discipline_4 from 'scripts/discipline_300.json';
import discipline_5 from 'scripts/discipline_400.json';

export default function Home() {
  const contentful_discipline_1 = extractEntryDataFromResponse(discipline_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(discipline_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(discipline_3);
  const contentful_discipline_4 = extractEntryDataFromResponse(discipline_4);
  const contentful_discipline_5 = extractEntryDataFromResponse(discipline_5);

  const data = orderBy(
    concat(
      contentful_discipline_1,
      contentful_discipline_2,
      contentful_discipline_3,
      contentful_discipline_4,
      contentful_discipline_5
    ),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const apps = {
    clans: {
      data: data,
    },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Discipline | Vamp ByNightStudio</title>
          <meta property="og:title" content="Discipline | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Disciplines are supernatural powers granted by the
                    Embrace. Vampires cultivate these powers and bring them to
                    bear against foes and prey. Fueled by blood and will,
                    disciplines provide an incomparable, mystical edge and are
                    the hallmarks of a vampire’s clan or bloodline."
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
          />
          <meta property="og:image:width" content="512px" />
          <meta property="og:image:height" content="512px" />
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
                  'https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250',
                image:
                  'https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250',
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
