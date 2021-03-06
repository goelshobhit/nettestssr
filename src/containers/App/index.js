/**
 *
 * App
 *
 */

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectReducer } from 'utils/inject-reducer';
import { useInjectSaga } from 'utils/inject-saga';

import { Switch, Route } from 'react-router-dom';
import localforage from 'localforage';
import ReactGA from 'react-ga';
import history from 'utils/history';

import WoVueHomePage from 'containers/WoVueHomePage/Loadable';
import Disciplines from 'containers/Disciplines/Loadable';
import DisciplinesDetails from 'containers/DisciplinesDetails/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Flaw from 'containers/Flaw/Loadable';
import Merits from 'containers/Merits/Loadable';
import ClanPage from 'containers/ClanPage/Loadable';
import Attribute from 'containers/Attributes/Loadable';
import Backgrounds from 'containers/Backgrounds/Loadable';
import Library from 'containers/Library/Loadable';
import Skills from 'containers/Skills/Loadable';
import Techniques from 'containers/Techniques/Loadable';
import TechniquesDetails from 'containers/TechniquesDetails/Loadable';
import Rituals from 'containers/Rituals/Loadable';
import FlawsDetails from 'containers/FlawsDetails/Loadable';
import MeritsDetails from 'containers/MeritsDetails/Loadable';
import RitualsListing from 'containers/RitualsListing/Loadable';
import QuickStart from 'containers/QuickStart/Loadable';
import Backers from 'containers/Backers/Loadable';
import Contributors from 'containers/Contributors/Loadable';
import YearBook from 'containers/YearBook/Loadable';
import SupportUs from 'containers/SupportUs/Loadable';
import SearchPage from 'containers/SearchPage/Loadable';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';

import makeSelectApp from './selectors';
import reducer from './reducer';
import saga from './saga';
import { getData, disciplineData } from './actions';

ReactGA.initialize('G-4XFK6E7DE4');

export function App({ app, onRequestData, onRequestDisciplineData }) {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  history.listen(location => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  });

  const {
    appData: { hasMore: disciplineHasMore },
  } = app;

  useEffect(() => {
    if (disciplineHasMore) {
      onRequestData();
      onRequestDisciplineData();
    }
    ReactGA.pageview(window.location.pathname);
  }, []);

  return (
    <div>
      <Header pathname={window.location.pathname} />
      <Switch>
        <Route exact path="/" component={WoVueHomePage} />
        <Route
          exact
          path="/vampire/disciplines/"
          component={DisciplinesDetails}
        />
        <Route
          exact
          path="/vampire/disciplines/:id"
          component={DisciplinesDetails}
        />
        <Route exact path="/vampire/flaws" component={FlawsDetails} />
        <Route exact path="/vampire/flaws/:id" component={FlawsDetails} />
        <Route exact path="/vampire/merits" component={MeritsDetails} />
        <Route exact path="/vampire/rituals" component={Rituals} />
        <Route exact path="/vampire/rituals/:id" component={Rituals} />
        <Route exact path="/vampire/merits/:id" component={MeritsDetails} />
        <Route exact path="/vampire/attributes/:id" component={Attribute} />
        <Route exact path="/vampire/attributes" component={Attribute} />
        <Route exact path="/vampire/backgrounds/:id" component={Backgrounds} />
        <Route exact path="/vampire/backgrounds" component={Backgrounds} />

        <Route exact path="/vampire/library/:id" component={Library} />
        <Route exact path="/vampire/library" component={Library} />
        <Route exact path="/vampire/yearBook/:id" component={YearBook} />
        <Route exact path="/vampire/yearBook" component={YearBook} />
        <Route exact path="/vampire/skills" component={Skills} />
        <Route exact path="/vampire/skills/:id" component={Skills} />
        <Route exact path="/vampire/techniques" component={TechniquesDetails} />
        <Route
          exact
          path="/vampire/techniques/:id"
          component={TechniquesDetails}
        />
        <Route exact path="/vampire/clan/:id" component={ClanPage} />
        <Route exact path="/vampire/clan/" component={ClanPage} />
        <Route exact path="/QuickStart" component={QuickStart} />
        <Route exact path="/Backers" component={Backers} />
        <Route exact path="/Contributors" component={Contributors} />
        <Route exact path="/SupportUs" component={SupportUs} />
        <Route exact path="/Search" component={SearchPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <Footer />
    </div>
  );
}

App.propTypes = {
  ...App,
};

const mapStateToProps = createStructuredSelector({
  app: makeSelectApp(),
});

function mapDispatchToProps(dispatch) {
  return {
    onRequestData: () => dispatch(getData()),
    onRequestDisciplineData: () => dispatch(disciplineData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(App);
