import { getServerSideSitemap } from 'next-sitemap';

import { orderBy, concat } from 'lodash';
import extractEntryDataFromResponse from 'utils/parsingText';

import clanMock from 'scripts/clans.json';
import discipline_1 from 'scripts/discipline_0.json';
import discipline_2 from 'scripts/discipline_100.json';
import discipline_3 from 'scripts/discipline_200.json';
import discipline_4 from 'scripts/discipline_300.json';
import discipline_5 from 'scripts/discipline_400.json';

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

  const fields = clanData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/clan/${capsule.title}`,
    lastmod: new Date().toISOString(),
  }));

  const discipleFields = disciplineData.map(capsule => ({
    loc: `https://vamp.bynightstudios.com/vampire/Disciplines/${capsule.power}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, concat(fields, discipleFields));
};

export default function Site() {}
