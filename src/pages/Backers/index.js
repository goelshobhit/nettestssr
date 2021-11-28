/**
 *
 * QuickStart
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'next/Head';
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

export function QuickStart(props) {
  useInjectReducer({ key: 'quickStart', reducer });
  useInjectSaga({ key: 'quickStart', saga });

  useEffect(() => {
    getContentPage();
  }, []);

  const { match, getContentPage, quickStart } = props;

  useEffect(() => {}, [match]);

  return (
    <div>
      <Helmet>
        <title>{`Backers | World of Darkness - MET - Vampire - Backers`} </title>
        <meta
          name="description"
          content="Aaron Gomez, Adam Benton, Adam Hobbs, Adam Lake, Adam Mitchell, Adam Reha, Adam Smith, Akira Barnes, Alan Jessup, Alexander Edwards, Alexander Winfield, Andrea Beduschi , Andrew Hermann, Andrew Kempf, Andrew Savill, Ann-Kathrine Mikkelsen, Anthony Ingrao, Arianna Parrish, Austin Warner
Becca Marshall, Benjamin Bolton, Bernard Dawson, Boris Khazin, Brandon Daniels, Brenden Moran, Brett Ritter, Bruce Gray, Bryan Himebaugh, Byron McCullough
Carley Biggins, Carron Joe, Charles Allen, Charles Cannaday, Charles Rieser, Chris Burns, Chris Campione, Chris Lyden, Christon Smith, Christopher Bonnett, Christopher Gibbs, Christopher Lemanski, Christopher Rhodes, Christopher Richardson, Christopher S. Berg, Christopher Blocher, Christopher Szynkowski, Christopher Wong, Clayton Gaughran, Cody B Killebrew, Cody Shadley, Collin Lazelle
Damon Edwards, Daniel Hicks, Daniel Hughes, Daniel Peterson, Darryl Purchner, Dave Valcourt, David Barnhill, David James Alverson, David Moore, David Petro, David S. Kerven, Derrick Burbee, Devin Anthony Stewart, Devin Saverline,

Emilio Echeverria, Eric Barber, Erik Berman, Errol Logan, Esteban Colon

Gareth Owings, Geoff Scott, George Chimples, Greg Craill, Gregory Bullard"
        />
      </Helmet>
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
