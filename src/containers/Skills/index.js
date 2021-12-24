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
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { map, get, isEmpty, find, trim, toLower } from 'lodash';
import { Typography } from 'antd';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import homePageReducer from 'containers/HomePage/reducer';
import homePageSaga from 'containers/HomePage/saga';
import makeSelectHomePage from 'containers/HomePage/selectors';

import { getData } from 'containers/App/actions';

import makeSelectClanPage from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getDropDownItems } from './actions';

const { Paragraph } = Typography;
export function ClanPage(props) {
  useInjectReducer({ key: 'clanPage', reducer });
  useInjectSaga({ key: 'clanPage', saga });

  useInjectReducer({ key: 'homePage', reducer: homePageReducer });
  useInjectSaga({ key: 'homePage', saga: homePageSaga });

  const [selectedClan, setSelectedClan] = useState('');

  const {
    app: {
      clans: { data: clanItems },
    },
  } = props;

  const filterClans = clanItems;

  useEffect(() => {
    const id = get(props, 'pageData.title', {});
    const findClanData = find(clanItems, { title: trim(id) });
    setSelectedClan(findClanData);
  }, [props]);

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

  return (
    <div className="clan-page">
      <div className="container main-content">
        <div className="row">
          <div className="col-md-8 order-md-12">
            <div className={`header-single ${getClassHeaderName(get(selectedClan, 'title'))}`}>
              <div className="row" style={{ fontSize: 18 }}>
                <h1>{get(selectedClan, 'title', '')}</h1>
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
            </div>
            <div className="boxWhite">
              {!isEmpty(get(selectedClan, 'description')) ? (
                <div>
                  <h2>DESCRIPTION</h2>
                  {map(get(selectedClan, 'description'), item => (
                    <p>{item}</p>
                  ))}
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

              {isEmpty(selectedClan) ? (
                <p>
                  <p>
                    Attributes represent your character’s raw potential, but skills represent the experience and
                    training she’s received throughout her life — both mortal and immortal. A character with high skills
                    is well-educated or has a great deal of knowledge about the world. A character with low skills might
                    be naive, sheltered, or uneducated.{' '}
                  </p>{' '}
                  <p>
                    You can purchase up to 5 dots of each skill. It’s not normally possible to buy more than 5 dots in a
                    skill.
                  </p>
                  <p>
                    Skills provide two kinds of bonuses to your character. First, they allow a character to perform
                    certain actions that an untrained character simply cannot attempt. Second, they augment a
                    character’s attributes, making certain actions easier because the character has experience or
                    education with a related skill.{' '}
                  </p>{' '}
                  <p>
                    For example, a character with a high Physical attribute rating who does not have the Athletics skill
                    might find it difficult to scale a wall or to leap a series of hurdles. A character with a high
                    Social attribute who does not have the Intimidate skill might find it difficult to bully her way
                    past a security guard.
                  </p>{' '}
                  <p>
                    {' '}
                    You should select your character’s skills based on that character’s background, and then place (or
                    purchase) more dots in the skills with which the character should be most profi cient. Skill levels
                    range from novice to master, as follows:
                  </p>
                  <p>• Novice: You have learned the fundamentals of this field of knowledge.</p>
                  <p>•• Practiced: You have mastered the basics of this area of study. </p>{' '}
                  <p>••• Competent: You are good enough to earn a professional living in this field.</p>
                  <p>•••• Expert: You have surpassed the majority of your peers and are considered an expert.</p>{' '}
                  <p>
                    ••••• Master: You are world-class at this activity and considered to be amongst the best in the
                    field.
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
                  <a href="/vampire/Skills">Skills</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {get(selectedClan, 'title', '')}
                </li>
              </ol>
            </nav>
            <div className="boxWhite">
              <h3>SKILLS</h3>
              <ul className="nav flex-column nav-clans">
                {map(filterClans, (items, index) => (
                  <li className="nav-item" onClick={handleNavItemsClick} value={items.title} key={index}>
                    <Link
                      href={`/vampire/skills/${toLower(items.title)}`}
                      value={items.title}
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}>
                      <span className={`nav-link ${getClassName(items.title)}`}>{items.title}</span>
                    </Link>
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
    OnRequestDropDownItems: params => dispatch(getDropDownItems(params)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ClanPage);
