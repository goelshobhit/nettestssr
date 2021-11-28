import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import Home from 'containers/WoVueHomePage';
import Header from 'components/Header_1';
import Footer from 'components/Footer_1';
export class IndexPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Head>
          <title>Vamp By Night Studio</title>
          <meta
            name="description"
            content="Art is the most important non-verbal language because it is universal and readily available and accessible to everyone. Creativity is the one source of power that will never run out for it preserves the insight of a culture's history. Together, art and creativity can traverse any boundary, impart any emotion, and communicate across time and space. — Nitara Elliot (formerly Sarah Driscol), Neonate of Clan Toreador"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://images.ctfassets.net/yicuw1hpxsdg/VS9IcigsbONBdUC80lRBG/4626001973d10635be7222e2a014600e/logo.webp?h=250"
          />
          <meta property="og:image:width" content="512px" />
          <meta property="og:image:height" content="512px" />
        </Head>
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}

IndexPage.propTypes = {
  t: PropTypes.func,
};

export default IndexPage;
