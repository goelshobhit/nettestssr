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
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Typography, Select, Button } from 'antd';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { map, find, get, isEmpty, slice, uniq, filter, orderBy, toLower } from 'lodash';
import history from 'utils/history';
import NavLink from 'components/NavLink';
import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import homePageReducer from 'containers/HomePage/reducer';
import homePageSaga from 'containers/HomePage/saga';
import makeSelectHomePage from 'containers/HomePage/selectors';

import { makeSelectApp } from 'containers/App/selectors';

import Smoke_style_4_clans from 'images/Smoke_style_4_clans.png';
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

  const [clanItemsList, setSelectedClanItemsList] = useState([]);
  const [selectedClan, setSelectedClan] = useState('');
  const [bookName, setBookName] = useState('filter by source book');

  const { app } = props;

  const {
    clans: { data: clanItems },
    match,
  } = app;

  useEffect(() => {
    setSelectedClanItemsList(clanItems);
    if (!isEmpty(props.pageData)) {
      setSelectedClan(props.pageData);
    }
  }, [props]);

  useEffect(() => {}, [match]);

  function handleNavItemsClick(e) {
    if (e.target) {
      const value = e.target.getAttribute('value');
      const findClanData = find(clanItemsList, { title: value });
      setSelectedClan(findClanData);
    }
  }

  function handleChangeFilter(item) {
    setBookName(item);
    const filterClanItems = filter(clanItems, o => o.sourceBooks[0].fields.bookTitle === item);
    setSelectedClanItemsList(filterClanItems);
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

  const sourceBook = map(clanItems, item => get(item, 'sourceBooks[0].fields.bookTitle', ''));

  const uniqSourceBook = uniq(sourceBook);

  function getSortedList(list) {
    return orderBy(list, ['fields.meritCost'], ['asc']);
  }

  function getSortedFlawList(list) {
    return orderBy(list, ['fields.flawCost'], ['asc']);
  }

  return (
    <div className="clan-page">
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className="header-single">
              <div style={{ display: 'flex' }}>
                <img
                  src={get(selectedClan, 'clanSymbol.file.url')}
                  alt=""
                  style={{
                    width: 45,
                  }}
                />
                <div className="col-md-8">
                  <div className="row" style={{ fontSize: 18 }}>
                    <h1 style={{ color: '#fff', fontWeight: 'bold' }}>{get(selectedClan, 'title', '')}</h1>
                    {get(selectedClan, 'title', '') ? (
                      <Paragraph
                        copyable={{
                          text: `${window.location.href}`,
                        }}
                        style={{ marginLeft: 10, color: '#fff' }}>
                        <i>Share Link</i>
                      </Paragraph>
                    ) : null}
                  </div>
                  <h4 style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
                    <i>{get(selectedClan, 'nickname', '')}</i>
                  </h4>
                </div>
              </div>
            </div>
            <div className="boxWhite">
              <div className="row">
                <div className="col-lg-6 col-md-12 order-lg-12 boxThumb">
                  <img
                    className="thumbClan"
                    src={get(selectedClan, 'featuredLead[0].fields.file.url', Smoke_style_4_clans)}
                    alt="$"
                  />
                </div>
                <div className="col-lg-6 col-md-12 order-lg-1">
                  <p>
                    <div
                      style={{ whiteSpace: 'break-spaces' }}
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(getSummaryHtml_1(get(selectedClan, 'description_html', ''))),
                      }}
                    />
                  </p>
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
              {!isEmpty(get(selectedClan, 'organization')) ? (
                <>
                  <h2>ORGANIZATION</h2>
                  <p>
                    <div
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(get(selectedClan, 'organization_html', '')),
                      }}
                    />
                  </p>
                </>
              ) : null}

              {!isEmpty(get(selectedClan, 'inClanDisciplines')) ? (
                <p>
                  <h2>In Clan Discipline</h2>
                  <Row>
                    {map(get(selectedClan, 'inClanDisciplines', []), (item, index) => (
                      <NavLink
                        href={`/vampire/Disciplines/${toLower(item.fields.title)}`}
                        name={`${item.fields.title} `}
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        color="Dodger Blue"
                      />
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
                      <Link href="/#" key={item}>
                        {item}
                        {', '}
                      </Link>
                    ))}
                  </Row>
                </div>
              ) : (
                <div />
              )} */}

              {!isEmpty(get(selectedClan, 'weakness')) ? (
                <p>
                  <h2>WEAKNESS</h2>
                  <Row>
                    {map(get(selectedClan, 'weakness', []), item => (
                      <p key={item}>{item}</p>
                    ))}
                  </Row>
                </p>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'inClanMerits')) ? (
                <p>
                  <h2>IN CLAN MERITS</h2>
                  <ul>
                    {map(getSortedList(get(selectedClan, 'inClanMerits', [])), item => (
                      <li>
                        <NavLink
                          href={`/vampire/Merits/${toLower(item.fields.merit)}`}
                          name={`${item.fields.merit}${' '}${item.fields.meritCost}`}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          color="Dodger Blue"
                        />
                      </li>
                    ))}
                  </ul>
                </p>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'flaws')) ? (
                <p>
                  <h2>IN CLAN FLAWS</h2>
                  <ul>
                    {map(getSortedFlawList(get(selectedClan, 'flaws', [])), item => (
                      <li>
                        <NavLink
                          href={`/vampire/flaws/${toLower(item.fields.flaw)}`}
                          name={`${item.fields.flaw}" "${item.fields.flawCost}`}
                          onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          color="Dodger Blue"
                        />
                      </li>
                    ))}
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
                            <p>{get(item, 'fields.bookTitle')}</p>
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
                  <a href="/vampire/clan/Assamite">Clans & Bloodlines</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {get(selectedClan, 'title', '')}
                </li>
              </ol>
            </nav>

            <div className="collapse navbar-collapse navbarBottom" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/vampire/clan/">
                    Clans & Bloodlines
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/disciplines">
                    Disciplines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/techniques">
                    Techniques
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/skills">
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/merits">
                    Merits
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/flaws">
                    Flaws
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/attributes">
                    Attributes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/backgrounds">
                    Backgrounds
                  </a>
                </li>
              </ul>
            </div>
            <div className="collapse navbar-collapse navbarBottom" id="navbarResponsive">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="/vampire/clan/">
                    Clans & Bloodlines
                    <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Disciplines">
                    Disciplines
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Techniques">
                    Techniques
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Skills">
                    Skills
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Merits">
                    Merits
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Flaws">
                    Flaws
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Attributes">
                    Attributes
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/vampire/Backgrounds">
                    Backgrounds
                  </a>
                </li>
              </ul>
            </div>
            <div className="boxWhite">
              <Row type="flex">
                <Select
                  style={{ width: '70%', marginBottom: 10, color: 'black' }}
                  placeholder="filter by source book"
                  onChange={handleChangeFilter}
                  value={bookName}>
                  <Option value="MET - VTM - Core Book">MET - VTM - Core Book</Option>
                  <Option value="MET - VTM - V2 (2021)">MET - VTM - V2 (2021)</Option>
                </Select>
                <Button
                  onClick={() => {
                    setBookName('filter by source book');
                    setSelectedClanItemsList(clanItems);
                  }}>
                  Reset
                </Button>
              </Row>

              <h3>CLANS & BLOODLINES</h3>
              <ul className="nav flex-column nav-clans">
                {map(clanItemsList, (items, index) => (
                  <li className="nav-item" onClick={handleNavItemsClick} value={items.title} key={index}>
                    <span
                      style={{
                        display: 'block',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        color: '#000000',
                      }}>
                      <img
                        src={get(items, 'clanSymbol.file.url')}
                        alt={items.title}
                        style={{
                          width: 22,
                          marginRight: 10,
                        }}
                      />
                      <NavLink
                        href={`/vampire/clan/${toLower(items.title)}`}
                        name={items.title}
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
    // OnRequestDropDownItems: params => dispatch(getDropDownItems(params)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ClanPage);
