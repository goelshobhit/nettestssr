import React from 'react';
import Head from 'next/head';

import { map, find, get, orderBy, toString, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/FlawsDetails';

import flaws_1 from 'scripts/flaws_0.json';
import flaws_2 from 'scripts/flaws_100.json';
import flaws_3 from 'scripts/flaws_200.json';

import clanMock from 'scripts/clans.json';

import styles from '../../../styles/Home.module.css';

const Page = ({ disData, data, clanData }) => {
  const apps = {
    flaws: { data: JSON.parse(data) },
    clans: { data: clanData },
  };

  const pageData = JSON.parse(disData);

  return (
    <div>
      <Head>
        <title>{pageData.flaw} | Vamp By Night Studio </title>
        <meta
          name="description"
          content={get(
            pageData,
            'summary[0]',
            `Flaws are disadvantages that pose challenges to a
            character’s nightly existence and provide a player a few
            extra experience points (XP) to spend elsewhere on her
            sheet. If you don’t see any that suit your character, you
            can create your character and play without adding any to
            your sheet. Flaws add up to 7 XP to your character, but also
            give that character a notable disadvantage in the game.
            Flaws are designed to be interesting, signifi cant, and to
            exemplify your character’s troubled past or personal
            prohibitions. You should try to roleplay your character’s
            flaws as much as possible, helping the Storyteller create a
            rich and detailed chronicle. Perfect people are no fun to
            roleplay, and characters with authentic-feeling traumas,
            biases, and failings bring life and vibrancy to the game.`
          )}
        />
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
  const contentful_discipline_1 = extractEntryDataFromResponse(flaws_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(flaws_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(flaws_3);

  const data = orderBy(
    concat(contentful_discipline_1, contentful_discipline_2, contentful_discipline_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const paths = map(data, page => ({
    params: { pid: toString(page.flaw) },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const contentful_discipline_1 = extractEntryDataFromResponse(flaws_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(flaws_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(flaws_3);

  const clanAppData = extractEntryDataFromResponse(clanMock);
  const clanData = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

  const data = orderBy(
    concat(contentful_discipline_1, contentful_discipline_2, contentful_discipline_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const pageData = find(data, item => item.flaw === params.pid);

  return { props: { disData: JSON.stringify(pageData), data: JSON.stringify(data), clanData: clanData } };
}

export default Page;
