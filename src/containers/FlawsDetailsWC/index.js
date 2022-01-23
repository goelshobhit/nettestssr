/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 *
 * ClanPage
 *
 */

import React, { memo, useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import PropTypes from 'prop-types';
import NavLink from 'components/NavLink';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { map, get, isEmpty, find, without, uniq, filter, concat, includes, toLower } from 'lodash';
import { Typography, Select, Row, Button } from 'antd';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import homePageReducer from 'containers/HomePage/reducer';
import homePageSaga from 'containers/HomePage/saga';
import makeSelectHomePage from 'containers/HomePage/selectors';

import makeSelectClanPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const { Paragraph } = Typography;
const { Option } = Select;
export function ClanPage(props) {
  useInjectReducer({ key: 'clanPage', reducer });
  useInjectSaga({ key: 'clanPage', saga });

  useInjectReducer({ key: 'homePage', reducer: homePageReducer });
  useInjectSaga({ key: 'homePage', saga: homePageSaga });

  const [selectedClan, setSelectedClan] = useState('');
  const [clanItemsList, setSelectedClanItemsList] = useState([]);

  const [disc, setDisc] = useState('filter by Clan');
  const [costName, setCost] = useState('filter by Cost');
  const [book, setBook] = useState('filter by source book');

  const {
    app: {
      flaws: { data: clanItems },
      clans: { data: meritData },
    },
  } = props;

  const filterClans = clanItems;

  useEffect(() => {
    setSelectedClanItemsList(clanItems);
  }, []);

  useEffect(() => {
    const flawClan = props.pageData;
    setSelectedClan(flawClan);
  }, [props]);

  function handleNavItemsClick(e) {
    if (e.target) {
      const value = e.target.getAttribute('value');
      const findClanData = find(filterClans, { flaw: value });
      setSelectedClan(findClanData);
    }
  }

  function getClassName(item) {
    if (item === 'Followers of Set') {
      return 'icon-FollowersofSet';
    }
    if (item === 'Daughters of Cacophony') {
      return 'icon-DaughtersofCacophony';
    }
    return `icon-${item}`;
  }

  function getClassHeaderName(item) {
    if (item === 'Followers of Set') {
      return 'icon-FollowersofSet';
    }
    if (item === 'Daughters of Cacophony') {
      return 'icon-DaughtersofCacophony';
    }
    return `icon-${item}`;
  }

  const sourceBook = map(clanItems, item => get(item, 'sourceBook_html.fields.bookTitle', ''));

  const uniqSourceBook = without(uniq(sourceBook), '');

  const cost = map(clanItems, item => get(item, 'flawCost', ''));

  const flawCost = without(uniq(cost), '').sort();

  function handleChangeFilter(item) {
    setBook(item);
    const filterClanItems = filter(clanItems, o => get(o, 'sourceBook_html.fields.bookTitle') === item);
    if (disc && disc !== 'filter by Clan') {
      if (includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
        let filterClans2 = filter(filterClanItems, o => includes(get(o, 'flawType[0]'), disc));
        if (costName && costName !== 'filter by Cost') {
          filterClans2 = filter(filterClans2, o => get(o, 'flawCost') === costName);
        }
        setSelectedClanItemsList(filterClans2);
      }
      if (!includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
        let filterClans1 = filter(filterClanItems, o => includes(get(o, 'clanFlaw'), disc));
        if (costName && costName !== 'filter by Cost') {
          filterClans1 = filter(filterClans1, o => get(o, 'flawCost') === costName);
        }
        setSelectedClanItemsList(filterClans1);
      }
    } else {
      setSelectedClanItemsList(filterClanItems);
    }
  }

  const clanNames = uniq(
    without(
      without(
        map(clanItems, o => get(o, 'flawType[0]')),
        undefined
      ),
      'Clan'
    )
  );

  const meritClanNames = uniq(
    without(
      map(meritData, o => {
        if (!o.parentClan) {
          return o.title;
        }
        return undefined;
      }),
      undefined
    )
  );

  const clanItemsDataOfFlaws = [];

  const filterList = concat(['General', 'Anarch', 'Camarilla', 'Sabbat'], meritClanNames);

  function handleFilterType(type) {
    setDisc(type);
    setSelectedClanItemsList(clanItems);
    // if (book && book !== 'filter by source book') {
    //   setBook(book);
    // }
    if (includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], type)) {
      let filterClans2 = filter(clanItems, o => includes(get(o, 'flawType[0]'), type));
      if (costName && costName !== 'filter by Cost') {
        filterClans2 = filter(filterClans2, o => get(o, 'flawCost') === costName);
      }

      if (book && book !== 'filter by source book') {
        filterClans2 = filter(filterClans2, o => get(o, 'sourceBook_html.fields.bookTitle') === book);
      }
      setSelectedClanItemsList(filterClans2);
    }
    if (!includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], type)) {
      let filterClans1 = filter(clanItems, o => includes(get(o, 'clanFlaw'), type));
      if (costName && costName !== 'filter by Cost') {
        filterClans1 = filter(filterClans1, o => get(o, 'flawCost') === costName);
      }
      if (book && book !== 'filter by source book') {
        filterClans1 = filter(filterClans1, o => get(o, 'sourceBook_html.fields.bookTitle') === book);
      }
      setSelectedClanItemsList(filterClans1);
    }
  }

  function handleFilterCostType(item) {
    setCost(item);
    const filterClanItems = filter(clanItems, o => get(o, 'flawCost') === item);
    if (disc && disc !== 'filter by Clan') {
      if (includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
        let filterClans2 = filter(filterClanItems, o => includes(get(o, 'flawType[0]'), disc));
        if (book && book !== 'filter by source book') {
          filterClans2 = filter(filterClans2, o => get(o, 'sourceBook_html.fields.bookTitle') === book);
        }
        setSelectedClanItemsList(filterClans2);
      }
      if (!includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
        let filterClans1 = filter(filterClanItems, o => includes(get(o, 'clanFlaw'), disc));
        if (book && book !== 'filter by source book') {
          filterClans1 = filter(filterClans1, o => get(o, 'sourceBook_html.fields.bookTitle') === book);
        }
        setSelectedClanItemsList(filterClans1);
      }
    } else {
      setSelectedClanItemsList(filterClanItems);
    }
  }

  return (
    <div className="clan-page">
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className={`header-single ${getClassHeaderName(get(selectedClan, 'flaw'))}`}>
              <div className="row" style={{ fontSize: 18 }}>
                <h1 style={{ color: '#fff' }}>{get(selectedClan, 'flaw', '')}</h1>
                {get(selectedClan, 'flaw', '') ? (
                  <Paragraph
                    copyable={{
                      text: `${window.location.href}`,
                    }}
                    style={{ marginLeft: 10, color: '#fff' }}>
                    {' '}
                    <i>Share Link</i>
                  </Paragraph>
                ) : null}
              </div>
            </div>
            <div className="boxWhite">
              <p>
                {get(selectedClan, 'clanFlaw') ? (
                  <div>
                    <h2>CLAN</h2>
                    {get(selectedClan, 'clanFlaw')}
                  </div>
                ) : (
                  <div />
                )}
              </p>
              <p>
                {get(selectedClan, 'flawCost') ? (
                  <div>
                    <h2>COST</h2>
                    {get(selectedClan, 'flawCost')}
                  </div>
                ) : (
                  <div />
                )}
              </p>
              <p>
                {!isEmpty(get(selectedClan, 'flawType')) ? (
                  <div>
                    <h2>TYPE</h2>
                    {map(get(selectedClan, 'flawType'), item => (
                      <p>{item}</p>
                    ))}
                  </div>
                ) : (
                  <div />
                )}
              </p>
              {!isEmpty(get(selectedClan, 'flawDescription')) ? (
                <div style={{ whiteSpace: 'break-spaces' }}>
                  <h2>DESCRIPTION</h2>
                  <div
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(get(selectedClan, 'flawDescription_html')),
                    }}
                  />
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'system')) ? (
                <div>
                  <h2>SYSTEM</h2>
                  {map(get(selectedClan, 'system'), item => (
                    <p>{item}</p>
                  ))}
                </div>
              ) : (
                <div />
              )}

              <p>
                {!isEmpty(get(selectedClan, 'focus')) ? (
                  <div>
                    <h2>FOCUS</h2>
                    {get(selectedClan, 'focus')}
                  </div>
                ) : (
                  <div />
                )}
              </p>
              <p>
                {!isEmpty(get(selectedClan, 'focus')) ? (
                  <p>
                    <h2>SOURCE BOOK</h2>
                    {!isEmpty(get(selectedClan, 'sourceBook')) ? (
                      <div>
                        {map(get(selectedClan, 'sourceBook'), item => (
                          <p>
                            <p>{get(item, 'fields.bookTitle')}</p>
                            <p>{get(item, 'fields.system[0]')}</p>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div> MET: VTM Source Book</div>
                    )}
                  </p>
                ) : (
                  <p />
                )}
              </p>
            </div>
          </div>
          <div className="col-md-4 order-md-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">
                    <span className="icon-skull">
                      <span className="path1" />
                      <span className="path2" />
                      <span className="path3" />
                      <span className="path4" />
                      <span className="path5" />
                      <span className="path6" />
                    </span>
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/vampire/Flaws">Flaws</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {get(selectedClan, 'flaw', '')}
                </li>
              </ol>
            </nav>
            <div className="boxWhite">
              <Row type="flex">
                <Select
                  style={{ width: '70%', paddingBottom: 20 }}
                  showSearch
                  placeholder="Filter"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={handleFilterType}
                  className="flawFilter"
                  value={disc}>
                  {map(uniq(filterList), item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setDisc('filter by Clan');

                    let filterClans2 = [];

                    if (costName && costName !== 'filter by Cost') {
                      filterClans2 = filter(clanItems, o => get(o, 'flawCost') === costName);
                    }
                    if (book && book !== 'filter by source book') {
                      filterClans2 = filter(
                        isEmpty(filterClans2) ? clanItems : filterClans,
                        o => get(o, 'sourceBook_html.fields.bookTitle') === book
                      );
                    }
                    setSelectedClanItemsList(filterClans2);
                    if (costName === 'filter by Cost' && book === 'filter by source book') {
                      setSelectedClanItemsList(clanItems);
                    }
                  }}>
                  Reset
                </Button>
              </Row>
              <Row type="flex">
                <Select
                  style={{ width: '70%', paddingBottom: 20 }}
                  showSearch
                  placeholder="Filter by cost"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={handleFilterCostType}
                  className="flawFilter"
                  value={costName}>
                  {map(flawCost, item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setCost('filter by Cost');

                    if (disc && disc !== 'filter by Clan') {
                      if (includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
                        let filterClans2 = filter(clanItems, o => includes(get(o, 'flawType[0]'), disc));
                        if (book && book !== 'filter by source book') {
                          filterClans2 = filter(filterClans2, o => get(o, 'sourceBook_html.fields.bookTitle') === book);
                        }
                        setSelectedClanItemsList(filterClans2);
                      }
                      if (!includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
                        let filterClans1 = filter(clanItems, o => includes(get(o, 'clanFlaw'), disc));
                        if (book && book !== 'filter by source book') {
                          filterClans1 = filter(filterClans1, o => get(o, 'sourceBook_html.fields.bookTitle') === book);
                        }
                        setSelectedClanItemsList(filterClans1);
                      }
                    }
                    if (disc === 'filter by Clan' && book === 'filter by source book') {
                      setSelectedClanItemsList(clanItems);
                    }
                  }}>
                  Reset
                </Button>
              </Row>
              <Row type="flex">
                <Select
                  style={{ width: '70%', marginBottom: 10, color: 'black' }}
                  placeholder="filter by source book"
                  onChange={handleChangeFilter}
                  value={book}>
                  <Option value="MET - VTM - Core Book">MET - VTM - Core Book</Option>
                  <Option value="MET - VTM - V2 (2021)">MET - VTM - V2 (2021)</Option>
                </Select>
                <Button
                  onClick={() => {
                    setBook('filter by source book');
                    if (disc && disc !== 'filter by Clan') {
                      if (includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
                        let filterClans2 = filter(clanItems, o => includes(get(o, 'flawType[0]'), disc));
                        if (costName && costName !== 'filter by Cost') {
                          filterClans2 = filter(filterClans2, o => get(o, 'flawCost') === costName);
                        }
                        setSelectedClanItemsList(filterClans2);
                      }
                      if (!includes(['Anarch', 'Camarilla', 'Clan', 'General', 'Sabbat'], disc)) {
                        let filterClans1 = filter(clanItems, o => includes(get(o, 'clanFlaw'), disc));
                        if (costName && costName !== 'filter by Cost') {
                          filterClans1 = filter(filterClans1, o => get(o, 'flawCost') === costName);
                        }
                        setSelectedClanItemsList(filterClans1);
                      }
                    }
                    if (disc === 'filter by Clan' && costName === 'filter by Cost') {
                      setSelectedClanItemsList(clanItems);
                    }
                  }}>
                  Reset
                </Button>
              </Row>
              <h3>FLAWS</h3>
              <ul className="nav flex-column nav-clans">
                {map(clanItemsList, (items, index) => (
                  <li className="nav-item" onClick={handleNavItemsClick} value={items.flaw} key={index}>
                    <span className={`nav-link ${getClassName(items.flaw)}`}>
                      <NavLink
                        href={`/vampire/flaws/${toLower(items.flaw)}`}
                        name={items.flaw}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ClanPage.propTypes = {
  ...ClanPage,
};

const mapStateToProps = createStructuredSelector({
  clanPage: makeSelectClanPage(),
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ClanPage);
