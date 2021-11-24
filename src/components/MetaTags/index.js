/**
 *
 * MetaTags
 *
 */
import React, { memo, useEffect } from 'react';

function MetaTags({ description }) {
  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      .setAttribute('content', description);
    document
      .querySelector('meta[name="og:description"]')
      .setAttribute('content', description);
  }, [description]);

  return <div />;
}

MetaTags.propTypes = {
  ...MetaTags,
};

export default memo(MetaTags);
