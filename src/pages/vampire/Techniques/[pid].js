import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { find, get, orderBy, concat, toLower } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import ClanPage from 'containers/TechniquesDetails';

import discipline_1 from 'scripts/techniques_0.json';
import discipline_2 from 'scripts/techniques_100.json';
import discipline_3 from 'scripts/techniques_200.json';

import styles from '../../../styles/Home.module.css';

const Page = () => {
  const router = useRouter();
  const contentful_discipline_1 = extractEntryDataFromResponse(discipline_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(discipline_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(discipline_3);

  const data = orderBy(
    concat(contentful_discipline_1, contentful_discipline_2, contentful_discipline_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const pageData = find(data, item => toLower(item.technique) === toLower(router.query.pid));

  const apps = {
    clans: {
      data: data,
    },
  };

  return (
    <div>
      <Head>
        <title>{get(pageData, 'technique')} | Vamp By Night Studio </title>
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
            'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg'
          )}
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'http://schema.org',
              '@type': 'Organisation',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'United States',
                addressRegion: 'New Orleans',
                postalCode: '70116',
                streetAddress: '1228 Royal St, New Orleans, LA 70116, United States',
              },
              email: 'mailto:support@bynightstudios.com',
              jobTitle: 'Organisation Product',
              name: 'Vamp BYNightStudio',
              url: 'https://bynightstudios.com/',
              sameAs: ['https://bit.ly/3D1e7vA'],
              aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', bestRating: '5', ratingCount: '54' },
              logo:
                'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
              image:
                'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
            }),
          }}
        />
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

export default Page;
