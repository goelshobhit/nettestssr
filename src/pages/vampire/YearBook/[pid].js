import React from 'react';
import Head from 'next/head';

import { map, find, get, orderBy, toString, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import clanMock from '../../../scripts/clans.json';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/YearBook';

import discipline_1 from 'scripts/yearBook_0.json';

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
        <title>{pageData.name} | Vamp By Night Studio </title>
        <meta name="description" content={pageData.quote} />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content={get(
            pageData,
            'clanSymbol.file.url',
            'https://cdn11.bigcommerce.com/s-d692ob2khy/images/stencil/500w/bynightstudios_logo_vampire_skull_white_chrismas_curved_v3_1637178153__05103.original.png'
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

  const data = orderBy(concat(contentful_discipline_1), 'name', ['asc']);

  const paths = map(data, page => ({
    params: { pid: toString(page.name) },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const contentful_discipline_1 = extractEntryDataFromResponse(discipline_1);

  const data = orderBy(concat(contentful_discipline_1), 'name', ['asc']);

  const pageData = find(data, item => item.name === params.pid);

  return { props: { disData: JSON.stringify(pageData), data: JSON.stringify(data) } };
}

export default Page;
