/* eslint-disable no-undef */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 *
 * ClanPage
 *
 */

import React, { memo, useEffect, useState } from 'react';
import NavLink from 'components/NavLink';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Typography, Select, Button } from 'antd';

import { map, find, get, isEmpty, slice, uniq, uniqBy, filter, orderBy, size, trim, toLower } from 'lodash';

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
  useInjectReducer({ key: 'yearBook', reducer });
  useInjectSaga({ key: 'yearBook', saga });

  useInjectReducer({ key: 'homePage', reducer: homePageReducer });
  useInjectSaga({ key: 'homePage', saga: homePageSaga });

  const [clanItemsList, setSelectedClanItemsList] = useState([]);
  const [selectedClan, setSelectedClan] = useState('');
  const [clan, setClan] = useState('filter by clan name');
  const [sectName, setSectName] = useState('filter by sect');

  const { app } = props;

  const {
    clans: { data: clanItems },
    match,
  } = app;

  useEffect(() => {
    setSelectedClanItemsList(clanItems);
  }, [props]);

  useEffect(() => {
    setSelectedClan(get(props, 'pageData', {}));
  }, [props]);

  useEffect(() => {}, [match]);

  function handleNavItemsClick(e) {
    if (e.target) {
      const value = e.target.getAttribute('value');
      const findClanData = find(clanItemsList, { name: value });
      setSelectedClan(findClanData);
    }
  }

  function handleChangeFilter(item) {
    setClan(item);
    let updatedClanItems = filter(clanItemsList, o => get(o, 'clan_html.fields.title') === item);
    if (sectName === 'filter by sect') {
      updatedClanItems = filter(clanItems, o => get(o, 'clan_html.fields.title') === item);
    }
    setSelectedClanItemsList(updatedClanItems);
  }

  function handleChangeFilter1(item) {
    setSectName(item);
    let updatedClanItems = filter(clanItemsList, o => get(o, 'sect') === item);
    if (clan === 'filter by clan name') {
      updatedClanItems = filter(clanItems, o => get(o, 'sect') === item);
    }
    setSelectedClanItemsList(updatedClanItems);
  }

  function getSummaryHtml(html) {
    if (html) {
      const mappedHtml = {
        ...html,
        content: slice(html.content, 1, html.content.length),
      };
      return mappedHtml;
    }
    return false;
  }

  function getSummaryHtml_1(html) {
    if (html) {
      const mappedHtml = {
        ...html,
        content: slice(html.content, 0, 1),
      };
      return mappedHtml;
    }
    return false;
  }

  const sourceBook = map(clanItems, item => get(item, 'sourceBooks[0].fields.bookname', ''));

  const uniqSourceBook = uniq(sourceBook);

  function getSortedList(list) {
    return orderBy(list, ['fields.meritCost'], ['asc']);
  }

  function getSortedFlawList(list) {
    return orderBy(list, ['fields.flawCost'], ['asc']);
  }

  const getLinks = item => {
    switch (item) {
      case 'clans':
        return 'Clan';
      case 'discipline':
        return 'Disciplines';
      case 'rituals':
        return 'Rituals';
      case 'skills':
        return 'Skills';
      case 'techniques':
        return 'Techniques';
      case 'merit':
        return 'Merits';
      case 'flaw':
        return 'Flaw';
      default:
        return '#';
    }
  };

  const renderLink = (item, refLink) => {
    return `/vampire/${getLinks(refLink)}/${trim(item)}`;
  };

  return (
    <div className="clan-page">
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className="header-single">
              <div style={{ display: 'flex' }}>
                <div className="col-md-8">
                  <div className="row" style={{ fontSize: 18 }}>
                    <h1 style={{ color: '#fff' }}>{get(selectedClan, 'name', '')}</h1>
                    {get(selectedClan, 'name', '') ? (
                      <Paragraph
                        copyable={{
                          text: `${window.location.href}`,
                        }}
                        style={{ marginLeft: 10, color: '#fff' }}>
                        <i>Share Link</i>
                      </Paragraph>
                    ) : null}
                  </div>
                  <h4 style={{ fontSize: 18 }}>
                    <i>{get(selectedClan, 'nickname', '')}</i>
                  </h4>
                </div>
              </div>
            </div>
            <div className="boxWhite">
              <div className="row">
                <div className="col-lg-6 col-md-12 order-lg-12 boxThumb">
                  <img
                    src={get(
                      selectedClan,
                      'art_html.fields.file.url',
                      get(selectedClan, 'clan_html.fields.clanSymbol.fields.file.url')
                    )}
                    alt="$"
                  />
                </div>
                <div className="col-lg-6 col-md-12 order-lg-1">
                  {!isEmpty(get(selectedClan, 'sect_html')) ? (
                    <>
                      <h2>Sect</h2>
                      <p>{get(selectedClan, 'sect_html', '')}</p>
                    </>
                  ) : null}
                  {!isEmpty(get(selectedClan, 'clan_html')) ? (
                    <>
                      <h2>Clan</h2>
                      <p>{get(selectedClan, 'clan_html.fields.title', '')}</p>
                    </>
                  ) : null}

                  {!isEmpty(get(selectedClan, 'drive')) ? (
                    <>
                      <h2>Drive</h2>
                      <p>{get(selectedClan, 'drive', '')}</p>
                    </>
                  ) : null}
                  {!isEmpty(get(selectedClan, 'looks_html')) ? (
                    <>
                      <h2>Looks</h2>
                      <p>{get(selectedClan, 'looks_html', '')}</p>
                    </>
                  ) : null}
                </div>
              </div>
              <br />

              {!isEmpty(get(selectedClan, 'quote')) ? (
                <blockquote className="blockquote">
                  <p className="mb-0">{get(selectedClan, 'quote', [])}</p>
                </blockquote>
              ) : null}

              <p>
                <div
                  style={{ whiteSpace: 'break-spaces' }}
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(getSummaryHtml(get(selectedClan, 'description_html', ''))),
                  }}
                />
              </p>
              <p>
                <p>{get(selectedClan, 'summary[1]', [])}</p>
                <p>{get(selectedClan, 'summary[2]', [])}</p>
              </p>
              {!isEmpty(get(selectedClan, 'background_html')) ? (
                <>
                  <h2>Background</h2>
                  <p>{get(selectedClan, 'background_html', '')}</p>
                </>
              ) : null}
              <p>
                {!isEmpty(get(selectedClan, 'specialties')) ? (
                  <>
                    <h2>specialties</h2>
                    <p>{get(selectedClan, 'specialties', '')}</p>
                  </>
                ) : null}
              </p>

              {!isEmpty(get(selectedClan, 'referemces')) ? (
                <p>
                  <h2>Specialties</h2>
                  <Row>
                    {map(get(selectedClan, 'referemces', []), (item, index) => (
                      <span className="anchorTag">
                        <NavLink
                          href={`/vampire/library/${toLower(item)}`}
                          name={`${item.fields.title}
                        ${size(get(selectedClan, 'referemces', [])) - 1 !== index ? ' ,' : null}`}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      </span>
                    ))}
                  </Row>
                </p>
              ) : (
                <div />
              )}
              {/*
               {!isEmpty(get(selectedClan, 'flaws')) ? (
                 <div>
                   <h2>Flaws</h2>
                   <Row gutter={[8, 8]}>
                     {map(get(selectedClan, 'flaws', []), item => (
                       <Link to="/#" key={item}>
                         {item}
                         {', '}
                       </Link>
                     ))}
                   </Row>
                 </div>
               ) : (
                 <div />
               )} */}

              {!isEmpty(get(selectedClan, 'inClanMerits')) ? (
                <p>
                  <h2>IN CLAN MERITS</h2>
                  <ul>
                    {/* {map(getSortedList(get(selectedClan, 'inClanMerits', [])), item => (
                      <li>
                        <Link
                          href={`/vampire/Merits/${item.fields.merit}`}
                          className="anchorTag"
                          style={{ marginRight: 10 }}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}>
                          {item.fields.merit}&nbsp;({item.fields.meritCost})
                        </Link>
                      </li>
                    ))} */}
                  </ul>
                </p>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'flaws')) ? (
                <p>
                  <h2>IN CLAN FLAWS</h2>
                  <ul>
                    {/* {map(getSortedFlawList(get(selectedClan, 'flaws', [])), item => (
                      <li>
                        <Link
                          href={`/vampire/Flaws/${item.fields.flaw}`}
                          className="anchorTag"
                          style={{ marginRight: 10 }}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}>
                          {item.fields.flaw}&nbsp;({item.fields.flawCost})
                        </Link>
                      </li>
                    ))} */}
                  </ul>
                </p>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'sourceBook')) ? (
                <p>
                  <h2>SOURCE BOOK</h2>
                  <Row>
                    {!isEmpty(get(selectedClan, 'sourceBook')) ? (
                      <div>
                        {map(get(selectedClan, 'sourceBook'), item => (
                          <p>
                            <p>{get(item, 'fields.bookname')}</p>
                            <p>{get(item, 'fields.system[0]')}</p>
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div> MET: VTM Source Book</div>
                    )}
                  </Row>
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
                  <a href="/vampire/YearBook" style={{ color: '#fff' }}>
                    YearBook
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {get(selectedClan, 'name', '')}
                </li>
              </ol>
            </nav>
            <div className="boxWhite">
              <Row type="flex">
                <Select
                  style={{ width: '70%', marginBottom: 10, color: 'black' }}
                  placeholder="filter by clan name"
                  onChange={handleChangeFilter}
                  value={clan}>
                  {map(clanItems, item => (
                    <Option value={get(item, 'clan_html.fields.title')} key={get(item, 'clan_html.fields.title')}>
                      {get(item, 'clan_html.fields.title')}
                    </Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setClan('filter by clan name');
                    let updatedClanItems = clanItems;
                    if (sectName !== 'filter by sect') {
                      updatedClanItems = filter(clanItems, o => get(o, 'sect') === sectName);
                    }
                    setSelectedClanItemsList(updatedClanItems);
                  }}>
                  Reset
                </Button>
              </Row>
              <Row type="flex">
                <Select
                  style={{ width: '70%', marginBottom: 10, color: 'black' }}
                  placeholder="filter by sect"
                  onChange={handleChangeFilter1}
                  value={sectName}>
                  {map(uniqBy(clanItems, 'sect'), item => (
                    <Option value={get(item, 'sect')} key={get(item, 'sect')}>
                      {get(item, 'sect')}
                    </Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setSectName('filter by sect');
                    let updatedClanItems = clanItems;
                    if (clan !== 'filter by clan name') {
                      updatedClanItems = filter(clanItemsList, o => get(o, 'clan_html.fields.title') === clan);
                    }
                    setSelectedClanItemsList(updatedClanItems);
                  }}>
                  Reset
                </Button>
              </Row>

              <h3>YearBook</h3>
              <ul className="nav flex-column nav-clans">
                {map(clanItemsList, (items, index) => (
                  <li className="nav-item" onClick={handleNavItemsClick} value={items.name} key={index}>
                    <a
                      rel="noreferrer"
                      href={`/vampire/YearBook/${toLower(items.name)}`}
                      value={items.name}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}>
                      <span className="nav-link">{items.name}</span>
                    </a>
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
    // OnRequestDropDownItems: params => dispatch(getDropDownItems(params)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ClanPage);
