import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/Attributes';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import discipline_1 from 'scripts/attributes.json';

export default function Home({ data }) {
  const apps = {
    attributes: {
      data: JSON.parse(data),
    },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Attributes | Vamp ByNightStudio </title>
          <meta property="og:title" content="Attributes | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Attributes quantify a character’s innate strengths and weaknesses. Depending upon how a player allocates her starting dots, the character might be strong and perceptive, quick and intelligent, or witty and beautiful, based on whether the character has high Physical, Social, or Mental attributes. A character should also be weak in some attributes."
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
