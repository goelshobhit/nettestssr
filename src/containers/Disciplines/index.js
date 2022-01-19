/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/**
 *
 * ClanPage
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import { Events } from 'react-scroll';
import Link from 'next/link';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Row, Typography, Select, Button, Collapse, Space } from 'antd';
import {
  map,
  filter,
  get,
  isEmpty,
  sortBy,
  orderBy,
  isEqual,
  slice,
  trim,
  uniqBy,
  includes,
  uniq,
  without,
  findIndex,
  last,
  isNull,
  toNumber,
  find,
  toLower,
} from 'lodash';

import { useInjectSaga } from 'utils/inject-saga';
import { useInjectReducer } from 'utils/inject-reducer';
import history from 'utils/history';

import homePageReducer from 'containers/HomePage/reducer';
import homePageSaga from 'containers/HomePage/saga';
import makeSelectHomePage from 'containers/HomePage/selectors';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import makeSelectClanPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const { Paragraph } = Typography;
const { Option } = Select;
const { Panel } = Collapse;
const Scroll = require('react-scroll');
const { Element } = Scroll;
const { scroller } = Scroll;

export function ClanPage(props) {
  useInjectReducer({ key: 'clanPage', reducer });
  useInjectSaga({ key: 'clanPage', saga });

  useInjectReducer({ key: 'homePage', reducer: homePageReducer });
  useInjectSaga({ key: 'homePage', saga: homePageSaga });

  const [selectedClan, setSelectedClan] = useState('');
  const [powerOfClans, setPowerOfClans] = useState([]);
  const [direction, setDirection] = useState('asc');
  const [powerClanIndex, setPowenClanIndex] = useState(-1);
  const [clanItemsList, setSelectedClanItemsList] = useState([]);
  const [filterValue, setFilterValue] = useState('filter by source book');
  const collapseRef = null;

  const { app } = props;

  const {
    clans: { data: clanItems },
  } = app;

  useEffect(() => {
    setSelectedClanItemsList(clanItems);
  }, []);

  const filterClans = uniqBy(
    sortBy(
      filter(clanItemsList, o => o.parent),
      'title'
    ),
    'title'
  );

  useEffect(() => {
    const id = get(props, 'pageData.title', {});

    const findClanData = find(filterClans, o => o.power === trim(id));

    if (findClanData) {
      setSelectedClan(findClanData);
    }

    const powerOfClansData = filter(clanItems, o => o.power === trim(get(findClanData, 'title')) && !o.parent);

    const uniqPowerOfClans = uniqBy(powerOfClansData, 'title');

    const sortedByLevel = orderBy(uniqPowerOfClans, 'level', [direction]);
    setPowerOfClans(sortedByLevel);
    setPowenClanIndex(-1);
    if (!findClanData) {
      const findClanData3 = find(clanItems, o => o.title === trim(id));
      const findClanData4 = find(clanItems, o => {
        if (o.power === get(findClanData3, 'power') && o.parent) {
          return o;
        }
      });
      setSelectedClan(findClanData4);
      const powerOfClansData1 = filter(clanItems, o => o.power === get(findClanData4, 'title') && !o.parent);

      const uniqPowerOfClans1 = uniqBy(powerOfClansData1, 'title');

      const sortedByLevel1 = orderBy(uniqPowerOfClans1, 'level', [direction]);
      setPowerOfClans(sortedByLevel1);
      const findIndexOfPower = findIndex(sortedByLevel1, o => o.title === trim(id));
      setPowenClanIndex(findIndexOfPower);
      if (findIndexOfPower !== -1) {
        const element = document.getElementById(`power-pannel`);
        const offset = 0;
        // const bodyRect = document.body.getBoundingClientRect().top;
        // const elementRect = element.getBoundingClientRect().top;
        // const elementPosition = elementRect - bodyRect;
        // const offsetPosition = elementPosition - offset;

        // window.scrollTo({
        //   top: offsetPosition,
        //   behavior: 'smooth',
        // });
      }
    }
  }, [props]);

  useEffect(() => {
    const element = document.getElementById(`discipline-${powerClanIndex}-power`);

    if (!isNull(element)) {
      const goToContainer = new Promise((resolve, reject) => {
        Events.scrollEvent.register('end', () => {
          resolve();
          Events.scrollEvent.remove('end');
        });

        scroller.scrollTo(`discipline-${powerClanIndex}-power`, {
          duration: 800,
          delay: 0,
          smooth: 'easeInOutQuart',
        });
      });

      goToContainer.then(() =>
        scroller.scrollTo('scroll-container-second-element', {
          duration: 100,
          delay: 0,
          smooth: 'easeInOutQuart',
          containerId: `discipline-${powerClanIndex}-power`,
        })
      );
    }
  }, [powerClanIndex]);

  function handleNavItemsClick(e) {
    // $('.site-collapse-custom-panel')
    //   .removeClass('ant-collapse-item-active')
    //   .addClass('ant-collapse-item site-collapse-custom-panel');
    // $('.ant-collapse-header').attr('aria-expanded', false);
    // $('.ant-collapse-content').addClass('ant-collapse-content-hidden');
    renderPowerClans();
    if (e.target) {
      const value = e.target.getAttribute('value');
      const findClanData = find(filterClans, { power: value });
      setSelectedClan(findClanData);
      const powerOfClansData = filter(clanItems, o => o.power === trim(get(findClanData, 'title')) && !o.parent);

      const uniqPowerOfClans = uniqBy(powerOfClansData, 'title');

      const sortedByLevel = orderBy(uniqPowerOfClans, 'level', [direction]);
      setPowerOfClans(sortedByLevel);
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

  function handleClanPower(sortByData) {
    const sortedByLevel = orderBy(powerOfClans, [sortByData], [direction]);

    setPowerOfClans(sortedByLevel);

    if (direction === 'asc') {
      setDirection('desc');
    } else {
      setDirection('asc');
    }
  }

  function getSummaryHtml(html) {
    if (html) {
      const mappedHtml = {
        ...html,
        content: slice(html.content, 1, 6),
      };
      return mappedHtml;
    }
    return false;
  }

  function getFilterPower(data) {
    const uniqPowerOfClans1 = uniqBy(data, 'title');
    const sortedByLevel1 = orderBy(uniqPowerOfClans1, 'level', [direction]);
    return sortedByLevel1;
  }

  const groupByData1 = filter(filterClans, o => o.thaumaturgy);
  const groupByData2 = filter(filterClans, o => o.necromancy);
  const groupByData3 = filter(
    filterClans,
    o => !o.thaumaturgy && !o.necromancy && o.title !== 'Necromancy' && o.title !== 'Thaumaturgy'
  );
  const filterClansByReduce = [
    { listName: '', data: groupByData3 },
    { listName: 'Necromancy', data: groupByData2 },
    { listName: 'Thaumaturgy', data: groupByData1 },
  ];

  function renderHelment() {
    return (
      <Helmet
        meta={[
          {
            name: `${get(selectedClan, 'power', '')}`,
            content: `${get(selectedClan, 'summary[0]', '')}`,
          },
        ]}>
        <title>
          {`
            World of Darkness - MET - Vampire - Disciplines`}
        </title>
        <meta name={`${get(selectedClan, 'power', '')}`} content={`${get(selectedClan, 'summary[0]', '')}`} />
      </Helmet>
    );
  }

  function renderLink(item) {
    const { title } = item;
    if (includes(title, 'Necromancy')) {
      return (
        <Link to="/vampire/Rituals#Necromancy">
          <a className="btn btn-primary">
            <span style={{ color: '#fff' }}>Details</span>
          </a>
        </Link>
      );
    }

    if (includes(title, 'Thaumaturgy')) {
      return (
        <Link to="/vampire/Rituals#Thaumaturgy">
          <a
            className="btn btn-primary"
            onClick={() => {
              history.push(``);
            }}>
            <span style={{ color: '#fff' }}>Details</span>
          </a>
        </Link>
      );
    }
    return (
      <a
        className="btn btn-primary"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          setSelectedClan(item);
          setPowenClanIndex(-1);
        }}>
        <span style={{ color: '#fff' }}>Details</span>
      </a>
    );
  }

  const sourceBook = map(clanItems, item => get(item, 'sourceBook_html.fields.bookTitle', ''));

  const uniqSourceBook = without(uniq(sourceBook), '');

  function handleChangeFilter(item) {
    setFilterValue(item);
    const filterClanItems = filter(clanItems, o => get(o, 'sourceBook_html.fields.bookTitle') === item);
    setSelectedClanItemsList(filterClanItems);
  }

  function renderPowerClans() {
    return (
      <p id="power-pannel">
        {!isEmpty(powerOfClans) ? (
          <div>
            <div>
              <h2>POWERS</h2>
              <div className="header-disciplines">
                <div className="disc-cols3 sort-up" style={{ color: 'black' }}>
                  <span onClick={() => handleClanPower('title')}>NAME</span>
                </div>
                <div className="disc-cols3 hideMobile" style={{ color: 'black' }}>
                  <span onClick={() => handleClanPower('level')}>Level</span>
                </div>
                <div className="disc-cols3 hideMobile" style={{ color: 'black' }}>
                  <span onClick={() => handleClanPower('cost')}>Cost</span>
                </div>
                <div className="indicator" style={{ color: '#fff' }} />
              </div>
              <div className="listing-body">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div className="listing">
                    {map(getFilterPower(powerOfClans), (item, index) => (
                      <p>
                        <div
                          id={`discipline-${index}-power`}
                          className={`item power-discipline discipline-${index}-power`}>
                          <div className="disc-cols3">
                            <span>{item.title}</span>
                          </div>
                          <div className="disc-cols3 hideMobile">
                            <span>{item.level}</span>
                          </div>
                          <div className="disc-cols3 hideMobile">
                            <span>{item.cost}</span>
                          </div>
                          <div
                            className="disc-indicator"
                            onClick={() => {
                              if (index === powerClanIndex) {
                                setPowenClanIndex(-1);
                              } else {
                                setPowenClanIndex(index);
                              }
                            }}>
                            <a
                              className={`btn btn-primary ${index === powerClanIndex ? 'collaps' : 'collapsed'}`}
                              data-toggle="collapse"
                              to={`${item.title}`}
                              role="button"
                              aria-expanded="false"
                              aria-controls={`${item.title}}`}>
                              <i className="fa" />
                            </a>
                          </div>
                        </div>
                        <div className={index === powerClanIndex ? 'collapse show' : 'collapse'} id={`${item.title}`}>
                          <div
                            className="box-summary"
                            style={{
                              backgroundColor: '#fff',
                              border: '1px solid grey',
                            }}>
                            <div>
                              <p>
                                {get(item, 'summary[0]', [])}
                                <Paragraph
                                  copyable={{
                                    text: `${window.location.origin}/vampire/Disciplines/${encodeURIComponent(
                                      item.title
                                    )}`,
                                  }}
                                  style={{ marginLeft: 10 }}>
                                  {' '}
                                  <i>Share Link</i>
                                </Paragraph>
                              </p>

                              {!isEmpty(get(item, 'quote')) ? (
                                <blockquote className="blockquote">
                                  <div
                                    /* eslint-disable-next-line react/no-danger */
                                    dangerouslySetInnerHTML={{
                                      __html: documentToHtmlString(item.quote_html),
                                    }}
                                  />
                                </blockquote>
                              ) : null}
                              <p>
                                <div
                                  /* eslint-disable-next-line react/no-danger */
                                  dangerouslySetInnerHTML={{
                                    __html: documentToHtmlString(getSummaryHtml(get(item, 'summary_html', ''))),
                                  }}
                                />
                              </p>

                              {!isEmpty(get(item, 'system')) ? (
                                <div>
                                  <h2>SYSTEM</h2>
                                  <div
                                    /* eslint-disable-next-line react/no-danger */
                                    dangerouslySetInnerHTML={{
                                      __html: documentToHtmlString(item.system_html),
                                    }}
                                  />
                                </div>
                              ) : (
                                <div />
                              )}

                              {!isEmpty(get(item, 'exceptional')) ? (
                                <div>
                                  <h2>Exceptional Success</h2>
                                  <Row gutter={[8, 8]}>{get(item, 'exceptional')}</Row>
                                </div>
                              ) : (
                                <div />
                              )}

                              {!isEmpty(get(item, 'exceptionalLong')) ? (
                                <div>
                                  <h2>Exceptional Success</h2>
                                  <Row gutter={[8, 8]}>
                                    <div
                                      /* eslint-disable-next-line react/no-danger */
                                      dangerouslySetInnerHTML={{
                                        __html: documentToHtmlString(item.exceptionalLong_html),
                                      }}
                                    />
                                  </Row>
                                </div>
                              ) : (
                                <div />
                              )}

                              {!isEmpty(get(item, 'focusDescriptor')) ? (
                                <div>
                                  <h2>Focus</h2>
                                  <Row type="flex" justify="start">
                                    <u
                                      style={{
                                        textDecoration: 'underline',
                                        textDecorationThickness: '2px',
                                        textDecorationSkipInk: 'auto',
                                        textUnderlineOffset: '3px',
                                        marginBottom: 10,
                                      }}>
                                      {' '}
                                      {get(item, 'foci')}
                                    </u>
                                    <span>&nbsp;{' : '}&nbsp;</span>
                                    <div
                                      style={{ width: '85%' }}
                                      /* eslint-disable-next-line react/no-danger */
                                      dangerouslySetInnerHTML={{
                                        __html: documentToHtmlString(item.focusDescriptor_html),
                                      }}
                                    />
                                  </Row>
                                </div>
                              ) : (
                                <div />
                              )}

                              {!isEmpty(get(item, 'interactions')) ? (
                                <div>
                                  <h2>INTERACTIONS</h2>
                                  <div
                                    /* eslint-disable-next-line react/no-danger */
                                    dangerouslySetInnerHTML={{
                                      __html: documentToHtmlString(item.interactions_html),
                                    }}
                                  />
                                </div>
                              ) : (
                                <div />
                              )}

                              <p>
                                {!isEmpty(get(item, 'cost')) ? (
                                  <div>
                                    <h2>COST</h2>
                                    {get(item, 'cost')}
                                  </div>
                                ) : (
                                  <div />
                                )}

                                {!isEmpty(get(item, 'testPool')) ? (
                                  <div>
                                    <h2>TEST POOL</h2>
                                    {get(item, 'testPool')}
                                  </div>
                                ) : (
                                  <div />
                                )}
                              </p>
                              <p>
                                {!isEmpty(get(item, 'sourceBook')) ? (
                                  <p>
                                    <h2>SOURCE BOOK</h2>
                                    {!isEmpty(get(item, 'sourceBook')) ? (
                                      <div>
                                        {map(get(item, 'sourceBook'), item => (
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
                                  <div />
                                )}
                              </p>
                              {/* <div className="row">
                                        {renderLink(item)}
                                      </div> */}
                            </div>
                          </div>
                        </div>
                      </p>
                    ))}
                  </div>
                </Space>
              </div>
            </div>
          </div>
        ) : null}
      </p>
    );
  }

  return (
    <div className="clan-page">
      <Element name="scroll-container-second-element" id="scroll-container-second-element" />
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className={`header-single ${getClassHeaderName(get(selectedClan, 'power'))}`}>
              <h1>
                <div className="row" style={{ fontSize: 18 }}>
                  <h1 style={{ color: '#fff' }}>{get(selectedClan, 'power', '')}</h1>
                  {get(selectedClan, 'power', '') ? (
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
                {!isEqual(get(selectedClan, 'power', ''), get(selectedClan, 'title', '')) ? (
                  <i>{get(selectedClan, 'title', '')} </i>
                ) : (
                  <div />
                )}
              </h1>
              <h4>{get(selectedClan, 'nickname', '')}</h4>
            </div>
            <div className="boxWhite">
              <p>
                {isEmpty(selectedClan) ? (
                  <p>
                    <p>
                      Disciplines are supernatural powers granted by the Embrace. Vampires cultivate these powers and
                      bring them to bear against foes and prey. Fueled by blood and will, disciplines provide an
                      incomparable, mystical edge and are the hallmarks of a vampire’s clan or bloodline.
                    </p>
                    <p>
                      By using her disciplines, a vampire can exert the strength of a dozen humans; trick an enemy into
                      submission; force her way into someone else’s mind; take the shape of a wolf, bat, or hideous
                      monstrosity — or numerous other things. A recently Embraced vampire might have only a few such
                      powers at her command, while an ancient may have mastered a fearsome breadth of potent feats.
                      Elders can learn awesome powers, fueled by the potency of their blood. Neonates and Ancillae use
                      the flexibility of their thinner blood to combine two or more disciplines and create new
                      techniques that are a mélange of powers.
                    </p>
                    <p>
                      Each vampiric clan possesses innate powers of the blood: disciplines that are native to that clan.
                      A vampire can learn those powers easily through experimentation and personal study; this process
                      requires you to spend 1 downtime action between game sessions. Learning other clans’ disciplines
                      is more difficult; it requires having a knowledgeable teacher and drinking blood from a vampire
                      who innately possesses those disciplines. As drinking blood causes a vampire to become partially
                      bound to the donor, learning disciplines from another vampire requires a great deal of trust.
                    </p>
                  </p>
                ) : (
                  <div />
                )}
              </p>
              <p>{get(selectedClan, 'summary[0]', [])}</p>
              {!isEmpty(get(selectedClan, 'quote')) ? (
                <blockquote className="blockquote">
                  <div
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.quote_html),
                    }}
                  />
                </blockquote>
              ) : null}
              <p>
                <div
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{
                    __html: documentToHtmlString(getSummaryHtml(get(selectedClan, 'summary_html', ''))),
                  }}
                />
              </p>

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

              {!isEmpty(get(selectedClan, 'exceptional')) ? (
                <div>
                  <h2>Exceptional Success</h2>
                  <Row gutter={[8, 8]}>{get(selectedClan, 'exceptional')}</Row>
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'exceptionalLong')) ? (
                <div>
                  <h2>Exceptional Success</h2>
                  <Row gutter={[8, 8]}>
                    <div
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(selectedClan.exceptionalLong_html),
                      }}
                    />
                  </Row>
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'focusDescriptor')) ? (
                <div>
                  <h2>Focus</h2>
                  <Row type="flex" justify="start">
                    <u
                      style={{
                        marginBottom: 10,
                      }}>
                      {' '}
                      {get(selectedClan, 'foci')}
                    </u>
                    <span>&nbsp;{' : '}&nbsp;</span>
                    <div
                      style={{ width: '85%' }}
                      /* eslint-disable-next-line react/no-danger */
                      dangerouslySetInnerHTML={{
                        __html: documentToHtmlString(selectedClan.focusDescriptor_html),
                      }}
                    />
                  </Row>
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'interactions')) ? (
                <div>
                  <h2>INTERACTIONS</h2>
                  <div
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.interactions_html),
                    }}
                  />
                </div>
              ) : (
                <div />
              )}

              {/* <p>
                  {get(selectedClan, 'level') ||
                  get(selectedClan, 'level') === 0 ? (
                    <div>
                      <h2>LEVEL</h2>
                      {get(selectedClan, 'level')}
                    </div>
                  ) : (
                    <div />
                  )}
                </p> */}

              <p>
                {!isEmpty(get(selectedClan, 'cost')) ? (
                  <div>
                    <h2>COST</h2>
                    {get(selectedClan, 'cost')}
                  </div>
                ) : (
                  <div />
                )}

                {!isEmpty(get(selectedClan, 'testPool')) ? (
                  <div>
                    <h2>TEST POOL</h2>
                    {get(selectedClan, 'testPool')}
                  </div>
                ) : (
                  <div />
                )}
              </p>
              <p>
                {!isEmpty(get(selectedClan, 'sourceBook')) ? (
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
                  <div />
                )}
              </p>

              {renderPowerClans()}
            </div>
          </div>
          <div className="col-md-4 order-md-1">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a to="/">
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
                <li className="breadcrumb-item" style={{ color: '#fff' }}>
                  <a to="/vampire/Disciplines">Disciplines</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {get(selectedClan, 'title', '')}
                </li>
              </ol>
            </nav>
            <div className="boxWhite">
              <Row type="flex">
                <Select
                  value={filterValue}
                  style={{ width: '70%', marginBottom: 10, color: 'black' }}
                  placeholder="filter by source book"
                  onChange={handleChangeFilter}>
                  {map(uniqSourceBook, item => (
                    <Option value={item}>{item}</Option>
                  ))}
                </Select>
                <Button
                  onClick={() => {
                    setSelectedClanItemsList(clanItems);
                    setFilterValue('filter by source book');
                  }}>
                  Reset
                </Button>
              </Row>
              <ul className="nav flex-column nav-clans">
                <Typography.Title level={3} style={{ marginBottom: '-30px' }}>
                  Disciplines
                </Typography.Title>
                {map(filterClansByReduce, (items, index) => (
                  <ul key={index}>
                    <Typography.Title level={3} className="nav-item" style={{ marginLeft: '-40px' }}>
                      <a href={`/vampire/Disciplines/${toLower(items.listName)}`}>
                        <span className={`nav-link ${getClassName(items.listName)}`}>{items.listName} </span>
                      </a>
                    </Typography.Title>
                    <li style={{ marginLeft: 10 }}>
                      {map(get(items, 'data'), (items1, index1) => (
                        <li className="nav-item" onClick={handleNavItemsClick} value={items1.title} key={index1}>
                          <a

                            rel="noreferrer"
                            href={`/vampire/Disciplines/${toLower(items1.power)}`}
                            value={items1.power}
                            onClick={() => {
                              setPowenClanIndex(-1);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}>
                            <span className={`nav-link ${getClassName(items1.power)}`}> {items1.power}</span>
                          </a>
                        </li>
                      ))}
                    </li>
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
