import React from 'react';
import Head from 'next/head';

import styles from '../../../styles/Home.module.css';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
import Disciplines from 'containers/Library';
import { orderBy, concat, map, find } from 'lodash';

import extractEntryDataFromResponse from '../../../utils/parsingText';

import contentPages_1 from 'scripts/contentPages_0.json';

export default function Home({ data, disData }) {
  const apps = {
    clans: {
      data: JSON.parse(data),
    },
  };

  const pageData = JSON.parse(disData);

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Skills | Vamp ByNightStudio </title>
          <meta property="og:title" content="Discipline | Vamp ByNightStudio" />
          <meta
            name="description"
            content="Skills provide two kinds of bonuses to your character.
            First, they allow a character to perform certain actions
            that an untrained character simply cannot attempt. Second,
            they augment a character’s attributes, making certain
            actions easier because the character has experience or
            education with a related skill."
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
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
                  'https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250',
                image:
                  'https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250',
              }),
            }}
          />
        </Head>
        <div className="container main-content">
          <Disciplines app={apps} pageData={pageData} />
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

export async function getStaticPaths() {
  const data = [
    'Auctoritas Ritae-  The Vaulderie (Sabbat)',
    'Auctoritas Ritae- High Holidays (Sabbat)',
    'Auctoritas Ritae- Monomancy (Sabbat)',
    'Auctoritas Ritae- War Party and Wild Hunt (Sabbat)',
    'Sabbat',
    'Factions and Faction Ritae (Sabbat)',
    'The Auctoritas Ritae (Sabbat)',
    'The Ignoblis Ritae (Sabbat)',
    'Character Creation Quick Start Guide',
    'Combat Maneuvers',
    'Aerial Combat Maneuvers',
    'Feral Combat Maneuvers',
    'Ghoul Rules',
    'Animal Retainers',
    'Influences- General',
    'Influence- Elite and Underworld Actions',
    'Optional Rules',
    'Advanced Feeding (Optional Rules)',
    'Blood Resonance (Optional Rules)',
    'Feeding Territories (Optional Rules)',
    'Spending XP',
    'Stock Locations',
    'Stock Locations - Iconic and Supernatural Qualities',
    'Stock Locations - Standard Qualities',
    'Stock Locations- Undermining Locations',
    'Stock Locations- Controlling them',
    'Stock NPC Generation',
    'Hunters: Arcanum',
    'Hunters: Project Twilight',
    'Hunters: Those of Faith',
    'Storytelling',
    'Cooperative Conflict and Advanced Narration: Expert Tools for Story Creation',
    'Platinum Rule',
    'The Temptation of the Beast',
    'Expanded Beast Trait System',
    'Expanded Path Mechanics',
    'Frenzy',
    'Vampire Sects and the Paths of Enlightenment',
  ];

  const paths = map(data, page => ({
    params: { pid: toString(page) },
  }));

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const contentful_discipline_1 = extractEntryDataFromResponse(contentPages_1);

  const data = orderBy(concat(contentful_discipline_1), [item => getItems(item).toLowerCase()], ['asc']);

  const pageData = find(data, item => item.title === params.pid);

  return { props: { disData: JSON.stringify(pageData), data: JSON.stringify(data) } };
}
