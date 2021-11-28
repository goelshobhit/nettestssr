/* eslint-disable react/prop-types */
/**
 *
 * Search
 *
 */

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Router from 'next/router'
import { Input, AutoComplete, Empty } from 'antd';
import Highlighter from 'react-highlight-words';
import { map, uniqBy, find, isEmpty } from 'lodash';
import get from 'lodash/get';
import { useRouter } from 'next/router';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import algoliasearch from 'algoliasearch';
import { InstantSearch, connectSearchBox, connectStateResults } from 'react-instantsearch-dom';

import makeSelectSearch from './selectors';
import reducer from './reducer';
import saga from './saga';

export function Search() {
  useInjectReducer({ key: 'search', reducer });
  useInjectSaga({ key: 'search', saga });
  const searchClient = algoliasearch('0YOI37FZAB', '5dd9d020035b8948cca3cdbbccca2359');
  const { query, pathname } = useRouter();
  useEffect(() => {
    // const {
    //   attributes: { data: attributesData },
    //   backgrounds: { data: backgroundsData },
    //   clans: { data: clansData },
    //   contentPages: { data: contentPagesData },
    //   disciplines: { data: disciplinesData },
    //   flaws: { data: flawsData },
    //   merits: { data: meritsData },
    //   rituals: { data: ritualsData },
    //   skills: { data: skillsData },
    //   techniques: { data: techniquesData },
    // } = search;
    // const combineData = concat(
    //   attributesData,
    //   backgroundsData,
    //   clansData,
    //   contentPagesData,
    //   disciplinesData,
    //   flawsData,
    //   meritsData,
    //   ritualsData,
    //   skillsData,
    //   techniquesData,
    // );
    // dataIndex.saveObjects(attributesData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(backgroundsData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(clansData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(contentPagesData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(disciplinesData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(flawsData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(meritsData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(ritualsData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(skillsData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
    // dataIndex.saveObjects(techniquesData, {
    //   autoGenerateObjectIDIfNotExist: true,
    // });
  }, []);

  // const AntdCard = ({ hit }) => (
  //   <Card title={hit.title}>
  //     <Card.Meta description={get(hit, 'summary[0]')} />
  //   </Card>
  // );

  // const searchResult = (data) => {
  //   console.log(data);
  //   return [];
  //  new Array(5)
  //     .join('.')
  //     .split('.')
  //     .map((_, idx) => {
  //       const category = `${query}${idx}`;
  //       return {
  //         value: category,
  //         label: (
  //           <div
  //             style={{
  //               display: 'flex',
  //               justifyContent: 'space-between',
  //             }}
  //           >
  //             <span>
  //               Found {query} on{' '}
  //               <a
  //                 href={`https://s.taobao.com/search?q=${query}`}
  //                 target="_blank"
  //                 rel="noopener noreferrer"
  //               >
  //                 {category}
  //               </a>
  //             </span>
  //             <span>results</span>
  //           </div>
  //         ),
  //       };
  //     })
  // }

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

  const searchResult = (data, searchState) => {
    const myQueryData = uniqBy(
      map(data, item => ({
        value: getItems(item),
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}>
            <Highlighter
              highlightClassName="YourHighlightClass"
              searchWords={[get(searchState, 'query')]}
              autoEscape
              textToHighlight={getItems(item)}
            />
          </div>
        ),
      })),
      'value'
    );
    return myQueryData;
  };

  const getUrl = item => {
    return item;
  };

  const getUrl1 = item => {
    return item.replace('/', null);
  };

  const myAntdSearchBox = ({ refine, searchResults, searchState }) => (
    <AutoComplete
      allowClear
      backfill
      dropdownMatchSelectWidth={252}
      style={{
        width: 300,
      }}
      options={searchResult(get(searchResults, 'hits', []), searchState)}
      onSelect={item => {
        const filterItem = find(get(searchResults, 'hits', []), o => getItems(o) === item);
        console.log(pathname);
        if(filterItem){
          Router.replace(filterItem.url);
        }

        // window.location.href = `${window.location.href}${filterItem.url}`;
        // Router.push(filterItem.url);
      }}
      onSearch={value => (!isEmpty(value) ? refine(value) : null)}
      notFoundContent={<Empty />}
      onPressEnter={value => (!isEmpty(value) ? refine(value) : null)}
      placeholder="Search"
      // onChange={event => refine(event.currentTarget.value)}
    />
  );

  const CustomSearchBox = connectSearchBox(connectStateResults(myAntdSearchBox));

  return (
    <div className="ais-InstantSearch">
      <InstantSearch indexName="search" searchClient={searchClient}>
        <div className="right-panel">
          <CustomSearchBox showLoadingIndicator />
        </div>
      </InstantSearch>
    </div>
  );
}

Search.propTypes = {
  ...Search,
};

const mapStateToProps = createStructuredSelector({
  search: makeSelectSearch(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Search);
