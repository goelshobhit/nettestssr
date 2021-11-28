import React from 'react';
import Head from 'next/head';

import { map, find, get, orderBy, toString, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import clanMock from '../../../scripts/clans.json';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/Disciplines';

import discipline_1 from 'scripts/discipline_0.json';
import discipline_2 from 'scripts/discipline_100.json';
import discipline_3 from 'scripts/discipline_200.json';
import discipline_4 from 'scripts/discipline_300.json';
import discipline_5 from 'scripts/discipline_400.json';

import styles from '../../../styles/Home.module.css';

const Page = ({ disData, data }) => {
  const apps = {
    clans: {
      data: JSON.parse(data),
    },
  };

  const pageData = JSON.parse(disData);

  return (
    <div>
      <Head>
        <title>{pageData.title} | Vamp By Night Studio </title>
        <meta name="description" content={get(pageData, 'summary[0]','Disciplines are supernatural powers granted by the Embrace. Vampires cultivate these powers and bring them to bear against foes and prey. Fueled by blood and will disciplines provide an incomparable, mystical edge and are the hallmarks of a vampire’s clan or bloodline.' )} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={get(
            pageData,
            'clanSymbol.file.url',
            'https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250'
          )}
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
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

export async function getStaticPaths() {

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

  const paths = map(data, page => ({
    params: { pid: toString(page.title) },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
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

  const pageData = find(data, item => item.title === params.pid);

  return { props: { disData: JSON.stringify(pageData), data: JSON.stringify(data) } };
}

export default Page;
