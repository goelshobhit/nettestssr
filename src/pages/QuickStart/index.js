/**
 *
 * QuickStart
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { get } from 'lodash';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import Header from 'components/Header_1';
import Footer from 'components/Footer_1';

import makeSelectQuickStart from './selectors';
import reducer from './reducer';
import saga from './saga';
import { defaultAction } from './actions';

export function QuickStart({ getContentPage, quickStart }) {
  useInjectReducer({ key: 'quickStart', reducer });
  useInjectSaga({ key: 'quickStart', saga });

  useEffect(() => {
    getContentPage();
  }, []);

  return (
    <div>
      <Head>
        <title>Quick Start | Vamp By Night Studio</title>
        <meta property="og:title" content="Quick Start | Vamp ByNightStudio" />
        <meta
          name="description"
          content="Check with your Storyteller to determine if your chosen clan is common, uncommon, or rare in your game’s setting. If you wish to portray an uncommon or rare clan, you must use some of your initial XP to purchase a specific Rarity merit."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://cdn11.bigcommerce.com/s-d692ob2khy/images/stencil/500w/bynightstudios_logo_vampire_skull_white_chrismas_curved_v3_1637178153__05103.original.png"
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
      </Head>
      <Header />
      <div className="container main-content">
        <div className="row">
          <div className="col-md-12 order-md-12">
            <div className="boxWhite">
              <div className="row">
                <h1
                  style={{
                    width: '100%',
                    textAlign: 'center',
                  }}>
                  {get(quickStart, 'data.title')}
                </h1>
                <div
                  className="content-page-content"
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{
                    __html: get(quickStart, 'data.description'),
                  }}
                />
              </div>
              <h4>Source Book</h4>
              <div>{get(quickStart, 'data.sourceBook.bookTitle')}</div>
              <div>{get(quickStart, 'data.sourceBook.system[0]')}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

QuickStart.propTypes = {
  ...QuickStart,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  quickStart: makeSelectQuickStart(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getContentPage: () => dispatch(defaultAction()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(QuickStart);
