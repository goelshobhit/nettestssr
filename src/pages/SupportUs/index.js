/**
 *
 * QuickStart
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';

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
        <title>Support Us | Vamp By Night Studio</title>
        <meta property="og:title" content="Quick Start | Vamp ByNightStudio" />
        <meta
          name="description"
          content="We welcome suggestions, donations, ideas, and more!  We will be launching a Patreon style support system for this in the future as well to support content, features, and other additions!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta
          property="og:image"
          content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
        />
        <meta property="og:image:width" content="512px" />
        <meta property="og:image:height" content="512px" />
      </Head>
      <Header/>
      <div className="container main-content">
        <div className="row">
          <div className="col-md-12 order-md-12">
            <div className="boxWhite">
              <div className="row">
                <h1
                  style={{
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {get(quickStart, 'data.title')}
                </h1>
                <div
                  className="content-page-content"
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{
                    __html: get(quickStart, 'data.description'),
                  }}
                />
                <div
                  className="content-page-content"
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{
                    __html: get(quickStart, 'data.quote'),
                  }}
                />
                <div
                  className="content-page-content"
                  /* eslint-disable-next-line react/no-danger */
                  dangerouslySetInnerHTML={{
                    __html: get(quickStart, 'data.system'),
                  }}
                />
              </div>
              <form
                action="https://www.paypal.com/donate"
                method="post"
                target="_top"
              >
                <input
                  type="hidden"
                  name="hosted_button_id"
                  value="8PUS5TKR868YA"
                />
                <input
                  type="image"
                  src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
                  border="0"
                  name="submit"
                  title="PayPal - The safer, easier way to pay online!"
                  alt="Donate with PayPal button"
                />
                <img
                  alt="nightStudio"
                  border="0"
                  src="https://www.paypal.com/en_US/i/scr/pixel.gif"
                  width="1"
                  height="1"
                />
              </form>
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

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(QuickStart);
