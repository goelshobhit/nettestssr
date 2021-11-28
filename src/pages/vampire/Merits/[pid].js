import React from 'react';
import Head from 'next/head';

import { map, find, get, orderBy, toString, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/MeritsDetails';

import merits_1 from 'scripts/merits_0.json';
import merits_2 from 'scripts/merits_100.json';
import merits_3 from 'scripts/merits_200.json';
import merits_4 from 'scripts/merits_300.json';
import merits_5 from 'scripts/merits_400.json';
import clanMock from 'scripts/clans.json';

import styles from '../../../styles/Home.module.css';

const Page = ({ disData, data, clanData }) => {
  const apps = {
    merits: { data: JSON.parse(data) },
    clans: { data: clanData },
  };

  const pageData = JSON.parse(disData);

  return (
    <div>
      <Head>
        <title>{pageData.merit} | Vamp By Night Studio </title>
        <meta
          name="description"
          content={get(
            pageData,
            'summary[0]',
            'Techniques aren’t disciplines; each technique is a learned methodology that integrates the use of two or more disciplines at once in order to create a unique effect. Such twisting of the blood is very difficult for vampires with great potency, as their blood is too thick for this sort of mongrel cogency. Elders have static blood, are resistant to change, and are unable to adapt to the swift mutations necessary to entwine two powers in such a way. These powers are the province of vampires who possess thinner, more transmutable vitae. Individuals of the 8th generation and below can cause their blood to vacillate between powers they have mastered, twisting those effects into a combination of those powers. Vampires can purchase techniques without a teacher, even if one or more of the prerequisites include out-of-clan disciplines for that character. The character simply needs to already possess the prerequisites for the specific technique she wishes to learn. Techniques cost 12 XP for Neonate and Ancilla vampires. Vampires of the 8th generation must spend 20 XP per technique, rather than the standard 12. Luminary and Master Elders cannot purchase techniques at all. Techniques have no attribute focuses and typically do not gain magnifi ed results if you achieve an exceptional success.'
          )}
        />
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
  const contentful_discipline_1 = extractEntryDataFromResponse(merits_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(merits_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(merits_3);
  const contentful_discipline_4 = extractEntryDataFromResponse(merits_4);
  const contentful_discipline_5 = extractEntryDataFromResponse(merits_5);

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
    params: { pid: toString(page.merit) },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
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

  const pageData = find(data, item => item.merit === params.pid);

  return { props: { disData: JSON.stringify(pageData), data: JSON.stringify(data), clanData: clanData } };
}

export default Page;
