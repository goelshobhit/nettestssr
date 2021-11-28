import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/Rituals';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import discipline_1 from 'scripts/rituals_0.json';
import discipline_2 from 'scripts/rituals_100.json';
import discipline_3 from 'scripts/rituals_200.json';

export default function Home({ data }) {
  const apps = {
    clans: {
      data: JSON.parse(data),
    },
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Rituals | Vamp ByNightStudio</title>
          <meta property="og:title" content="Discipline | Vamp ByNightStudio" />
          <meta
            name="description"
            content=" Necromancy, Thaumaturgy and Abyss Mysticism do not have elder powers or techniques. Instead,
            practitioners of these arts gain access to mystical rituals specific to their art. Rituals are
            formulaic and require a significant amount of time, as well as specialized implements and
            ingredients. You cannot buy a specific ritual until you have purchased the appropriate dot of
            Obtenebration/ Necromancy/ Thaumaturgy to support that ritual- for example, learning a level 4
            Thaumaturgy ritual requires you already possess 4 dots in your primary Thaumaturgy path. In
            addition, you must purchase one ritual of each level before you are able to purchase a ritual at
            the next-higher level. For example, in order to purchase a level 2 ritual, an Abyss Mystic must
            already possess at least one level 1 ritual."
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
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
  const contentful_discipline_2 = extractEntryDataFromResponse(discipline_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(discipline_3);

  const data = orderBy(
    concat(contentful_discipline_1, contentful_discipline_2, contentful_discipline_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  return {
    props: { data: JSON.stringify(data) },
    revalidate: 10, // will be passed to the page component as props
  };
}
