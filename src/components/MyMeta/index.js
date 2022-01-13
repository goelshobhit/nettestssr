/**
 *
 * MyMeta
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import forEach from 'lodash/forEach';

function MyMeta({ title }) {
  useEffect(() => {
    forEach(document.getElementsByTagName('meta'), item => item.removeAttribute('data-react-helmet'));
  }, []);

  return (
    <div>
      <Helmet
        encodeSpecialCharacters
        defer={false}
        title="World of Darkness"
        meta={[
          { name: 'author', content: 'vamp.bynightstudios' },

          { name: 'twitter:site', content: 'vamp.bynightstudios' },
          { name: 'twitter:creator', content: 'vamp.bynightstudios' },
          { name: 'twitter:title', content: title },
          {
            name: 'twitter:image',
            content:
              'https://images.ctfassets.net/yicuw1hpxsdg/51CkZna50G9tBUwI8BX5vQ/93a829cc00212a2a0cb8f5cf12b750b9/logo.jpeg',
          },

          {
            property: 'og:title',
            content: title,
          },
          {
            property: 'og:site_name',
            content: 'https://vamp.bynightstudios.com/',
          },
          { property: 'og:type', content: 'website' },
          {
            property: 'og:url',
            content: `vamp.bynightstudios.com`,
          },
          {
            property: 'og:description',
            content:
              "Art is the most important non-verbal language because it is universal and readily available and accessible to everyone. Creativity is the one source of power that will never run out for it preserves the insight of a culture's history. Together, art and creativity can traverse any boundary, impart any emotion, and communicate across time and space. — Nitara Elliot (formerly Sarah Driscol), Neonate of Clan Toreador",
          },
          { property: 'og:site_name', content: 'vamp.bynightstudios' },
          { name: 'viewport', content: 'width=device-width, maximum-scale=1' },
        ]}>
        <title>{title}</title>
      </Helmet>
    </div>
  );
}

MyMeta.propTypes = {
  ...MyMeta,
};

export default memo(MyMeta);
