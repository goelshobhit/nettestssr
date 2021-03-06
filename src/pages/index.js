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
          <title>Vamp By Night Studios</title>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'http://schema.org',
                '@type': 'Organisation',
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'United States',
                  addressRegion: 'New Orleans',
                  postalCode: '70116',
                  streetAddress: '1228 Royal St, New Orleans, LA 70116, United States',
                },
                email: 'mailto:support@bynightStudioss.com',
                jobTitle: 'Organisation Product',
                name: 'Vamp BYNightStudios',
                url: 'https://bynightStudioss.com/',
                sameAs: ['https://bit.ly/3D1e7vA'],
                aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.7', bestRating: '5', ratingCount: '54' },
                logo:
                  'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
                image:
                  'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
              }),
            }}
          />
          <meta
            name="description"
            content="Art is the most important non-verbal language because it is universal and readily available and accessible to everyone. Creativity is the one source of power that will never run out for it preserves the insight of a culture's history. Together, art and creativity can traverse any boundary, impart any emotion, and communicate across time and space. ??? Nitara Elliot (formerly Sarah Driscol), Neonate of Clan Toreador"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta
            property="og:image"
            content="https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg"
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
