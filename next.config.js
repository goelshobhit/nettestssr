const withImages = require('next-images');

module.exports = {
  images: {
    domains: ['images.ctfassets.net'],
    withImages: withImages(),
  },
};
