/* eslint-disable camelcase */
/* eslint-disable guard-for-in */
/* eslint-disable no-undef */
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
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { map, get, isEmpty, find, filter, groupBy, sortBy, concat, includes, toLower } from 'lodash';
import { Typography, Menu } from 'antd';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Tree from 'components/Tree';
import homePageReducer from 'containers/HomePage/reducer';
import homePageSaga from 'containers/HomePage/saga';
import makeSelectHomePage from 'containers/HomePage/selectors';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import makeSelectClanPage from './selectors';
import reducer from './reducer';
import saga from './saga';

const { Paragraph } = Typography;
const { SubMenu } = Menu;
export function ClanPage(props) {
  useInjectReducer({ key: 'clanPage', reducer });
  useInjectSaga({ key: 'clanPage', saga });

  useInjectReducer({ key: 'homePage', reducer: homePageReducer });
  useInjectSaga({ key: 'homePage', saga: homePageSaga });
  const [selectedClan, setSelectedClan] = useState('');
  const [libMenu, setLibMenu] = useState([]);
  const [subItemsList, setSubItemsList] = useState([]);
  const [subItemsList1, setSubItemsList1] = useState([]);
  const [openMenu, setOpenMenu] = useState([]);

  const {
    app: {
      clans: { data: clanItems },
    },
    match,
  } = props;

  const hasSubMenu = (item1, item2) => {
    const parentClans = map(item2, data2 => data2 && data2.directLibraryParent_html.fields.title);
    const mappedItems = map(item1, data => ({
      ...data,
      hasSubMenu: includes(parentClans, data.title),
    }));

    return mappedItems;
  };

  const filterClans = filter(clanItems, o => !o.exclude);

  useEffect(() => {
    const id = get(props, 'pageData.title', {});
    const findClanData = find(clanItems, { title: id });
    const openedItem = get(findClanData, 'directLibraryParent_html.fields.title');
    if (openedItem) {
      setOpenMenu(openedItem);
    } else {
      setOpenMenu(id);
    }

    setSelectedClan(findClanData);
  }, [props]);

  useEffect(() => {
    const isLibraryEntryClanItems = filter(clanItems, { isLibraryEntry: true });

    const groupedItems = groupBy(isLibraryEntryClanItems, 'libraryTreeLevel');
    const subItems = concat(groupedItems[2]);
    setSubItemsList(subItems);
    setSubItemsList1(groupedItems[3]);
    // // eslint-disable-next-line no-restricted-syntax
    const groupedItemsArray = hasSubMenu(groupedItems[1], subItems);
    const sortedGroupItemsArray = sortBy(groupedItemsArray, ['menu'], 'asc');
    setLibMenu(sortedGroupItemsArray);
  }, [clanItems]);

  function handleNavItemsClick(e) {
    if (e.target) {
      const value = e.target.getAttribute('value');
      const findClanData = find(filterClans, { title: value });
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

  const handleOpenMenu = item => {
    setOpenMenu(item);
    const findClanData = find(clanItems, { title: item.title });
    setSelectedClan(findClanData);
  };

  return (
    <div className="clan-page">
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className={`header-single ${getClassHeaderName(get(selectedClan, 'title'))}`} style={{ fontSize: 18 }}>
              <h1>{get(selectedClan, 'title', '')}</h1>
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
            <div className="boxWhite content-page-wrap">
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

              {!isEmpty(get(selectedClan, 'quote')) ? (
                <div>
                  <h2>QUOTE</h2>
                  <div
                    className="system"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.quote_html),
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
                    className="system"
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.system_html),
                    }}
                  />
                </div>
              ) : (
                <div />
              )}

              {!isEmpty(get(selectedClan, 'eratta')) ? (
                <div>
                  <h2>ERRATA</h2>
                  <div
                    /* eslint-disable-next-line react/no-danger */
                    dangerouslySetInnerHTML={{
                      __html: documentToHtmlString(selectedClan.eratta_html),
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

              {isEmpty(selectedClan) ? (
                <div>
                  <i>
                    “My childe, alway remember this most important lesson: sanguis pretium amissis ludum. Blood is the
                    price of losing the game.”
                  </i>
                  <p>— Alain Martel, Luminary Elder, Clan Ventrue</p>
                </div>
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
                  <a href="/vampire/Library">Library</a>
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
                  <a className="nav-link" href="/Disciplines">
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
                  <a className="nav-link" href="/vampire/Library">
                    Library
                  </a>
                </li>
              </ul>
            </div>
            <div className="boxWhite">
              <h3>LIBRARY</h3>
              {/* <Tree /> */}
              <ul className="nav flex-column nav-clans">
                <Tree
                  openMenu={match !== openMenu ? openMenu : ''}
                  setOpenMenu={handleOpenMenu}
                  match={match !== openMenu ? match : ''}
                />
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
