import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/TechniquesDetails';
import { orderBy, concat } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import discipline_1 from 'scripts/techniques_0.json';
import discipline_2 from 'scripts/techniques_100.json';
import discipline_3 from 'scripts/techniques_200.json';

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
          <title>Techniques | Vamp ByNightStudio</title>
          <meta property="og:title" content="Techniques | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Techniques aren’t disciplines; each technique is a learned methodology that integrates the use of two or more disciplines at once in order to create a unique effect. Such twisting of the blood is very difficult for vampires with great potency, as their blood is too thick for this sort of mongrel cogency. Elders have static blood, are resistant to change, and are unable to adapt to the swift mutations necessary to entwine two powers in such a way. These powers are the province of vampires who possess thinner, more transmutable vitae. Individuals of the 8th generation and below can cause their blood to vacillate between powers they have mastered, twisting those effects into a combination of those powers. Vampires can purchase techniques without a teacher, even if one or more of the prerequisites include out-of-clan disciplines for that character. The character simply needs to already possess the prerequisites for the specific technique she wishes to learn. Techniques cost 12 XP for Neonate and Ancilla vampires. Vampires of the 8th generation must spend 20 XP per technique, rather than the standard 12. Luminary and Master Elders cannot purchase techniques at all. Techniques have no attribute focuses and typically do not gain magnifi ed results if you achieve an exceptional success."
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
