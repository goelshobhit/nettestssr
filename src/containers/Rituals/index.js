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
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { map, get, isEmpty, find, filter, uniq, without, replace, split, toLower } from 'lodash';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import { Typography, Select, Row, Button } from 'antd';
import homePageReducer from 'containers/HomePage/reducer';
import homePageSaga from 'containers/HomePage/saga';
import makeSelectHomePage from 'containers/HomePage/selectors';

import makeSelectClanPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const { Paragraph } = Typography;
export function ClanPage(props) {
  useInjectReducer({ key: 'clanPage', reducer });
  useInjectSaga({ key: 'clanPage', saga });

  useInjectReducer({ key: 'homePage', reducer: homePageReducer });
  useInjectSaga({ key: 'homePage', saga: homePageSaga });
  const router = useRouter();
  const [selectedClan, setSelectedClan] = useState('');
  const [clanItemsList, setClanItemList] = useState([]);

  const [disc, setDisc] = useState('filter by type');
  const [costName, setCost] = useState('filter by level');
  const [book, setBook] = useState('filter by source book');

  const {
    app: {
      clans: { data: clanItems },
    },
    match,
  } = props;

  const filterClans = clanItems;

  function getBooleanValue(item) {
    const { thaumaturgy, abyssal, necromancy } = item;
    if (thaumaturgy) {
      return 'Thaumaturgy';
    }
    if (abyssal) {
      return 'Abyssal';
    }
    if (necromancy) {
      return 'Necromancy';
    }
    return false;
  }

  useEffect(() => {
    const id = get(props, 'pageData.title', {});
    const hash = split(router.asPath, '#');
    if (hash.length > 1) {
      const hashKey = split(router.asPath, '#')[1];
      const filterClans1 = filter(filterClans, o => getBooleanValue(o) === hashKey);
      setSelectedClan(filterClans1);
    }
    if (isEmpty(selectedClan)) {
      const findClanData = find(clanItems, { title: id });
      setClanItemList(clanItems);
      setSelectedClan(findClanData);
    }
  }, [props]);

  function handleNavItemsClick(e) {
    if (e.target) {
      const value = e.target.getAttribute('value');
      const findClanData = find(clanItemsList, { title: value });
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

  function getBooleanValue(item) {
    if (selectedClan) {
      const { thaumaturgy, abyssal, necromancy } = item;
      if (thaumaturgy) {
        return 'Thaumaturgy';
      }
      if (abyssal) {
        return 'Abyssal';
      }
      if (necromancy) {
        return 'Necromancy';
      }
    }

    return false;
  }

  const groupByData1 = filter(clanItemsList, o => o.abyssal);
  const groupByData2 = filter(clanItemsList, o => o.necromancy);
  const groupByData3 = filter(clanItemsList, o => o.thaumaturgy);
  const filterClansByReduce = [
    { listName: 'Abyssal', data: groupByData1 },
    { listName: 'Necromancy', data: groupByData2 },
    { listName: 'Thaumaturgy', data: groupByData3 },
  ];

  function handleSelectOnType(type) {
    setDisc(type);
    let groupByDataType = filter(clanItems, o => o[`${type}`]);

    if (book && book !== 'filter by source book') {
      groupByDataType = filter(groupByDataType, o => get(o, 'sourceBook_html[0].fields.bookTitle') === book);
    }

    if (costName && costName !== 'filter by level') {
      groupByDataType = filter(groupByDataType, o => o.level === costName);
    }

    setClanItemList(groupByDataType);
  }

  const levelData = uniq(map(clanItems, o => o.level)).sort();

  function handleSelectOnLevel(type) {
    setCost(type);
    let filterClanItems = filter(clanItems, o => o.level === type);
    if (book && book !== 'filter by source book')
      filterClanItems = filter(filterClanItems, o => get(o, 'sourceBook_html[0].fields.bookTitle') === book);

    if (disc && disc !== 'filter by type') {
      filterClanItems = filter(filterClanItems, o => o[`${disc}`]);
    }
    setClanItemList(filterClanItems);
  }

  const sourceBook = map(clanItems, item => get(item, 'sourceBook_html[0].fields.bookTitle', ''));

  const uniqSourceBook = without(uniq(sourceBook), '');

  function handleChangeFilter(item) {
    setBook(item);
    let filterClanItems = filter(clanItems, o => get(o, 'sourceBook_html[0].fields.bookTitle') === item);

    if (disc && disc !== 'filter by type') {
      filterClanItems = filter(filterClanItems, o => o[`${disc}`]);
    }
    if (costName && costName !== 'filter by level') {
      filterClanItems = filter(filterClanItems, o => o.level === costName);
    }
    setClanItemList(filterClanItems);
  }

  return (
    <div className="clan-page">
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className={`header-single ${getClassHeaderName(get(selectedClan, 'title'))}`}>
              <div className="header-single">
                <div className="row">
                  <div className="col-lg-7 col-md-12 order-lg-12">
                    <div className="row" style={{ fontSize: 18 }}>
                      <h1 style={{ color:'#fff'}}>{get(selectedClan, 'title', '')}</h1>
                      {get(selectedClan, 'title', '') ? (
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
                  <div className="col-lg-5 col-md-12 order-lg-12">
                    <div className="info">
                      <div className="info-des" style={{ width: 130 }}>
                        Type<span>{getBooleanValue(selectedClan)}</span>
                      </div>
                      <div className="info-des">
                        Level<span>{get(selectedClan, 'level', '')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="boxWhite">
              <p>
                {!isEmpty(get(selectedClan, 'summary')) ? (
                  <div>
                    <h2>TYPE</h2>
                    {getBooleanValue(selectedClan)}
                  </div>
                ) : (
                  <div />
                )}

                {!isEmpty(get(selectedClan, 'summary')) ? (
                  <div>
                    <h2>SUMMARY</h2>
                    <div
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(selectedClan.summary_html),
                      }}
                    />
                  </div>
                ) : (
                  <div />
                )}
              </p>
              {!isEmpty(get(selectedClan, 'testPool')) ? (
                <div>
                  <h2>TEST POOL</h2>
                  <p>{get(selectedClan, 'testPool')}</p>
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'description')) ? (
                <div>
                  <h2>DESCRIPTION</h2>
                  <div
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.description_html),
                    }}
                  />
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'system')) ? (
                <div>
                  <h2>SYSTEM</h2>
                  <div
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.system_html),
                    }}
                  />
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
                {!isEmpty(get(selectedClan, 'sourceBook_html')) ? (
                  <p>
                    <h2>SOURCE BOOK</h2>
                    {!isEmpty(get(selectedClan, 'sourceBook_html')) ? (
                      <div>
                        <p>{get(selectedClan, 'sourceBook_html[0].fields.bookTitle')}</p>
                        <p>{get(selectedClan, 'sourceBook_html[0].fields.system[0]')}</p>
                      </div>
                    ) : (
                      <div> MET: VTM Source Book</div>
                    )}
                  </p>
                ) : (
                  <p />
                )}
              </p>

              {isEmpty(selectedClan) ? (
                <p>
                  <h2>RITUALS</h2>
                  <p>
                    <p>
                      {' '}
                      Necromancy, Thaumaturgy and Abyss Mysticism do not have elder powers or techniques. Instead,
                      practitioners of these arts gain access to mystical rituals specific to their art. Rituals are
                      formulaic and require a significant amount of time, as well as specialized implements and
                      ingredients. You cannot buy a specific ritual until you have purchased the appropriate dot of
                      Obtenebration/ Necromancy/ Thaumaturgy to support that ritual- for example, learning a level 4
                      Thaumaturgy ritual requires you already possess 4 dots in your primary Thaumaturgy path. In
                      addition, you must purchase one ritual of each level before you are able to purchase a ritual at
                      the next-higher level. For example, in order to purchase a level 2 ritual, an Abyss Mystic must
                      already possess at least one level 1 ritual.
                    </p>
                    <p>
                      The cost to purchase a ritual is equal to the ritual's level times two. Therefore, a level 3
                      ritual costs 6 XP to purchase. A Thaumaturgist or Necromancer cannot learn more rituals than dots
                      of Thaumaturgy/ Necromancy that she currently possesses. For example, Marianna Giovanni possesses
                      4 dots in the Sepulchre Path, her primary path, as well as 3 dots in the Bone Path, and 2 dots in
                      the Ash Path. Thus, she can learn nine Necromancy rituals. An Abyss Mystic is not limited in the
                      number of rituals she may purchase.
                    </p>
                  </p>
                </p>
              ) : (
                <div />
              )}
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
                  <a href="/vampire/Rituals">Rituals</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {get(selectedClan, 'title', '')}
                </li>
              </ol>
            </nav>

            <div className="boxWhite">
              <Row type="flex">
                <Select
                  style={{ width: '70%', paddingBottom: 20 }}
                  showSearch
                  placeholder="Filter by type"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={handleSelectOnType}
                  className="meritFilter"
                  value={disc}>
                  <Select.Option value="abyssal">Abyssal</Select.Option>
                  <Select.Option value="necromancy">Necromancy</Select.Option>
                  <Select.Option value="thaumaturgy">Thaumaturgy</Select.Option>
                </Select>
                <Button
                  onClick={() => {
                    setDisc('filter by type');
                    let groupByDataType = [];

                    if (book && book !== 'filter by source book') {
                      groupByDataType = filter(
                        clanItemsList,
                        o => get(o, 'sourceBook_html[0].fields.bookTitle') === book
                      );
                    }

                    if (costName && costName !== 'filter by level') {
                      groupByDataType = filter(clanItemsList, o => o.level === costName);
                    }

                    setClanItemList(groupByDataType);
                    if (costName === 'filter by level' && book === 'filter by source book') {
                      setClanItemList(clanItems);
                    }
                  }}>
                  Reset
                </Button>
              </Row>

              <Row type="flex">
                <Select
                  style={{ width: '70%', paddingBottom: 20 }}
                  showSearch
                  placeholder="Filter By Level"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA && optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={handleSelectOnLevel}
                  className="meritFilter"
                  value={costName}>
                  {map(levelData, item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setCost('filter by level');

                    let groupByDataType = [];

                    if (disc && disc !== 'filter by type') {
                      groupByDataType = filter(clanItems, o => o[`${disc}`]);
                    }

                    if (book && book !== 'filter by source book') {
                      groupByDataType = filter(
                        groupByDataType,
                        o => get(o, 'sourceBook_html[0].fields.bookTitle') === book
                      );
                    }

                    setClanItemList(groupByDataType);
                    if (disc === 'filter by type' && book === 'filter by source book') {
                      setClanItemList(clanItems);
                    }
                    // handleChangeFilter(book);
                    // handleSelectOnType(disc);
                  }}>
                  Reset
                </Button>
              </Row>

              <Row type="flex">
                <Select
                  style={{ width: '70%', paddingBottom: 20 }}
                  showSearch
                  placeholder="Filter by Source Book"
                  optionFilterProp="children"
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  filterSort={(optionA, optionB) =>
                    optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                  }
                  onSelect={handleChangeFilter}
                  className="meritFilter"
                  value={book}>
                  {map(uniqSourceBook.reverse(), item => (
                    <Select.Option value={item}>{item}</Select.Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setBook('filter by source book');

                    let groupByDataType = [];
                    if (disc && disc !== 'filter by type') {
                      groupByDataType = filter(clanItems, o => o[`${disc}`]);
                    }
                    if (costName && costName !== 'filter by level') {
                      groupByDataType = filter(groupByDataType, o => o.level === costName);
                    }
                    setClanItemList(groupByDataType);
                    if (disc === 'filter by type' && costName === 'filter by level') {
                      setClanItemList(clanItems);
                    }
                  }}>
                  Reset
                </Button>
              </Row>
              <h3>RITUALS</h3>
              <ul className="nav flex-column nav-clans">
                {map(filterClansByReduce, (itemData, index1) => (
                  <ul key={index1}>
                    {!isEmpty(itemData.data) ? <b style={{ marginTop: 20, fontSize: 20 }}>{itemData.listName}</b> : ''}
                    {map(itemData.data, (items, index) => (
                      <li className="nav-item" onClick={handleNavItemsClick} value={items.title} key={index}>
                        <a

                          rel="noreferrer"
                          href={`/vampire/Rituals/${toLower(items.title)}`}
                          value={items.title}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}>
                          <span className={`nav-link ${getClassName(items.title)}`}>{items.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
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
  onRequestData: PropTypes.func,
  homePage: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  clanPage: makeSelectClanPage(),
  homePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // onRequestData: () => dispatch(getData()),
    // OnRequestDropDownItems: params => dispatch(getDropDownItems(params)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ClanPage);
