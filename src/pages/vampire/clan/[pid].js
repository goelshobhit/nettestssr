import React from 'react';
import Head from 'next/head';

import { map, find, get, orderBy, toString } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import clanMock from '../../../scripts/clans.json';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/ClanPage';
import styles from '../../../styles/Home.module.css';

const Page = ({ pageData, data }) => {
  const apps = {
    clans: {
      data: data,
    },
  };
  return (
    <div>
      <Head>
        <title>{pageData.title} | Vamp By Night Studio </title>
        <meta name="description" content={pageData.description[0]} />
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
  const clanAppData = extractEntryDataFromResponse(clanMock);
  const data = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

  const paths = map(data, page => ({
    params: { pid: toString(page.title) },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const clanAppData = extractEntryDataFromResponse(clanMock);
  const data = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

  const pageData = find(data, item => item.title === params.pid);

  return { props: { pageData: pageData, data: data } };
}

export default Page;
