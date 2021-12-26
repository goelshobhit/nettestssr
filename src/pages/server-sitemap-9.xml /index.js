import React from 'react';
import { getServerSideSitemap } from 'next-sitemap';
import { orderBy, concat, toLower } from 'lodash';
import extractEntryDataFromResponse from 'utils/parsingText';

import clanMock from 'scripts/clans.json';
import discipline_1 from 'scripts/discipline_0.json';
import discipline_2 from 'scripts/discipline_100.json';
import discipline_3 from 'scripts/discipline_200.json';
import discipline_4 from 'scripts/discipline_300.json';
import discipline_5 from 'scripts/discipline_400.json';

import rituals_1 from 'scripts/rituals_0.json';
import rituals_2 from 'scripts/rituals_100.json';
import rituals_3 from 'scripts/rituals_200.json';

import tech_1 from 'scripts/techniques_0.json';
import tech_2 from 'scripts/techniques_100.json';
import tech_3 from 'scripts/techniques_200.json';

import skill_1 from 'scripts/skills.json';

import merits_1 from 'scripts/merits_0.json';
import merits_3 from 'scripts/merits_200.json';
import merits_4 from 'scripts/merits_300.json';
import merits_5 from 'scripts/merits_400.json';

import flaws_1 from 'scripts/flaws_0.json';
import flaws_2 from 'scripts/flaws_100.json';
import flaws_3 from 'scripts/flaws_200.json';

import lib_1 from 'scripts/contentPages_0.json';

import yb_1 from 'scripts/yearBook_0.json';
import at_1 from 'scripts/attributes.json';
import bg_1 from 'scripts/backgrounds.json';

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

export const getServerSideProps = async ctx => {
  const clanAppData = extractEntryDataFromResponse(clanMock);
  const clanData = orderBy(clanAppData, [item => getItems(item).toLowerCase()], ['asc']);

  const contentful_discipline_1 = extractEntryDataFromResponse(discipline_1);
  const contentful_discipline_2 = extractEntryDataFromResponse(discipline_2);
  const contentful_discipline_3 = extractEntryDataFromResponse(discipline_3);
  const contentful_discipline_4 = extractEntryDataFromResponse(discipline_4);
  const contentful_discipline_5 = extractEntryDataFromResponse(discipline_5);

  const disciplineData = orderBy(
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

  const contentful_rituals_1 = extractEntryDataFromResponse(rituals_1);
  const contentful_rituals_2 = extractEntryDataFromResponse(rituals_2);
  const contentful_rituals_3 = extractEntryDataFromResponse(rituals_3);

  const ritualsData = orderBy(
    concat(contentful_rituals_1, contentful_rituals_2, contentful_rituals_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const contentful_tech_1 = extractEntryDataFromResponse(tech_1);
  const contentful_tech_2 = extractEntryDataFromResponse(tech_2);
  const contentful_tech_3 = extractEntryDataFromResponse(tech_3);

  const techData = orderBy(
    concat(contentful_tech_1, contentful_tech_2, contentful_tech_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const contentful_skill_1 = extractEntryDataFromResponse(skill_1);

  const skillData = orderBy(concat(contentful_skill_1), [item => getItems(item).toLowerCase()], ['asc']);

  const contentful_merit_1 = extractEntryDataFromResponse(merits_1);
  const contentful_merit_3 = extractEntryDataFromResponse(merits_3);
  const contentful_merit_4 = extractEntryDataFromResponse(merits_4);
  const contentful_merit_5 = extractEntryDataFromResponse(merits_5);

  const meritData = orderBy(
    concat(contentful_merit_1, contentful_merit_3, contentful_merit_4, contentful_merit_5),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const contentful_flaw_1 = extractEntryDataFromResponse(flaws_1);
  const contentful_flaw_2 = extractEntryDataFromResponse(flaws_2);
  const contentful_flaw_3 = extractEntryDataFromResponse(flaws_3);

  const flawData = orderBy(
    concat(contentful_flaw_1, contentful_flaw_2, contentful_flaw_3),
    [item => getItems(item).toLowerCase()],
    ['asc']
  );

  const contentful_lib_1 = extractEntryDataFromResponse(lib_1);
  const libData = orderBy(concat(contentful_lib_1), [item => getItems(item).toLowerCase()], ['asc']);

  const contentful_yb_1 = extractEntryDataFromResponse(yb_1);

  const ybData = orderBy(concat(contentful_yb_1), 'name', ['asc']);

  const contentful_at_1 = extractEntryDataFromResponse(at_1);
  const atData = orderBy(concat(contentful_at_1), [item => getItems(item).toLowerCase()], ['asc']);

  const contentful_bg_1 = extractEntryDataFromResponse(bg_1);

  const bgdata = orderBy(concat(contentful_bg_1), [item => getItems(item).toLowerCase()], ['asc']);

  const fields = clanData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/clan/${toLower(capsule.title)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const discipleFields = disciplineData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Disciplines/${toLower(capsule.power)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const ritualsfields = ritualsData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Rituals/${toLower(capsule.title)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const techfields = techData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Techniques/${toLower(capsule.technique)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const skillsfields = skillData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Skills/${toLower(capsule.title)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const meritsfields = meritData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Merits/${toLower(capsule.merit)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const flawfields = flawData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/flaws/${toLower(capsule.flaw)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const libfields = libData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/library/${toLower(capsule.title)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const ybfields = ybData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/YearBook/${toLower(capsule.name)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const atfields = atData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Attributes/${toLower(capsule.attribute)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const bgfields = bgdata.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Backgrounds/${toLower(capsule.title)}`,
    lastmod: new Date().toISOString(),
    priority: 0.8,
    changefreq: 'monthly',
  }));

  const sponsorsFields = [
    {
      loc: `https://vamp.bynightstudios.com/QuickStart`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: 'monthly',
    },
    {
      loc: `https://vamp.bynightstudios.com/Backers`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: 'monthly',
    },
    {
      loc: `https://vamp.bynightstudios.com/SupportUs`,
      lastmod: new Date().toISOString(),
      priority: 0.8,
      changefreq: 'monthly',
    },
  ];

  return getServerSideSitemap(ctx, concat(atfields));
};

export default function Site() {
  return <div />;
}
