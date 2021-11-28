import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/Backgrounds';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import discipline_1 from 'scripts/backgrounds.json';

export default function Home({ data }) {
  const apps = {
    backgrounds: {
      data: JSON.parse(data),
    },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Backgrounds | Vamp ByNightStudio </title>
          <meta property="og:title" content="backgrounds | Vamp ByNightStudio" />
          <meta
            name="description"
            content="The following backgrounds are available to your character. In general, having multiple dots in a background allows for more effective or more frequent use of that background’s benefit. Some backgrounds change your character during character creation, while others affect the character only after she enters the game. Read each background carefully to determine which are appropriate for your character’s story."
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
  const contentful_discipline_1 = extractEntryDataFromResponse(discipline_1);

  const data = orderBy(concat(contentful_discipline_1), [item => getItems(item).toLowerCase()], ['asc']);

  return {
    props: { data: JSON.stringify(data) },
    revalidate: 10, // will be passed to the page component as props
  };
}
