import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/MeritsDetails';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import clanMock from 'scripts/clans.json';
import merits_1 from 'scripts/merits_0.json';
import merits_2 from 'scripts/merits_100.json';
import merits_3 from 'scripts/merits_200.json';
import merits_4 from 'scripts/merits_300.json';
import merits_5 from 'scripts/merits_400.json';

export default function Home({ data, clanData }) {
  const apps = {
    merits: { data: JSON.parse(data) },
    clans: { data: clanData },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Merits | Vamp ByNightStudio</title>
          <meta property="og:title" content="Merits | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Merits are special advantages that help distinguish a character and show the effects of her history
            and ongoing story. If you don’t see any that suit your character, you can create your character and
            play without adding any to your sheet. You may purchase up to 7 points of merits. However, a
            character can never have more than 7 points of merits at any time. This rule encourages players to
            make significant choices about the qualities that make a character unique."
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://cdn11.bigcommerce.com/s-d692ob2khy/images/stencil/500w/bynightstudios_logo_vampire_skull_white_chrismas_curved_v3_1637178153__05103.original.png"
          />
          <meta property="og:image:width" content="512px" />
          <meta property="og:image:height" content="512px" />
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

export async function getStaticProps() {
  const contentful_discipline_1 = extractEntryDataFromResponse(merits_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(merits_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(merits_3);
  const contentful_discipline_4 = extractEntryDataFromResponse(merits_4);
  const contentful_discipline_5 = extractEntryDataFromResponse(merits_5);

  const clanAppData = extractEntryDataFromResponse(clanMock);
  const clanData = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

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

  return {
    props: { data: JSON.stringify(data), clanData: clanData },
  };
}
