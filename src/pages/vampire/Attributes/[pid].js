import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { map, find, get, orderBy, toString, concat, toLower } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/AttributesWC';

import discipline_1 from 'scripts/attributes.json';

import styles from '../../../styles/Home.module.css';

const Page = () => {
  const contentful_discipline_1 = extractEntryDataFromResponse(discipline_1);
  const router = useRouter();
  const data = orderBy(concat(contentful_discipline_1), [item => getItems(item).toLowerCase()], ['asc']);
  const pageData = find(data, item => toLower(item.attribute) === toLower(router.query.pid));

  const apps = {
    attributes: {
      data: data,
    },
  };

  return (
    <div>
      <Head>
        <title>{pageData.attribute} | Vamp By Night Studios </title>
        <meta name="description" content={pageData.description[0]} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={get(
            pageData,
            'clanSymbol.file.url',
            'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg'
          )}
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
      <Header />
      <div className={styles.container}>
        <ClanPage app={apps} pageData={pageData} />
      </div>
      <Footer />
    </div>
  );
};

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

export default Page;
