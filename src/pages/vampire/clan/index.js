import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/ClanPage';
import { orderBy } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import clanMock from 'scripts/clans.json';

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
          <title>Vamp By Night Studio</title>
          <meta property="og:title" content="Clan | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Powers belonging to vampires of the Third Generation (those
                    known as Antediluvians ) were narrower in scope than the
                    powers possessed by their Second Generation sires. The
                    predilections, aptitudes, and weaknesses of the
                    Antediluvians were more stable than their predecessors’.
                    These distinctions were passed down to the vampires they
                    Embraced, marking each one as belonging to a specific
                    lineage. Those lineages, known as clans, have defined
                    vampiric society throughout history. Each vampire clan has
                    certain characteristics. The supernatural powers carried in
                    the clan’s blood defines them, as does the specific curse
                    that afflicts members of that clan. These are passed down
                    from sire to childe until the blood is weakened by being so
                    many generations removed from the Antediluvians that it can
                    no longer support these distinctions. These thin-blooded
                    childer are known as Caitiff. They have no clan, and are
                    considered outcasts by vampiric society."
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
          <ClanPage app={apps} pageData={null} />
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
  const clanAppData = extractEntryDataFromResponse(clanMock);
  const data = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: { data: JSON.stringify(data) },
    revalidate: 10, // will be passed to the page component as props
  };
}
