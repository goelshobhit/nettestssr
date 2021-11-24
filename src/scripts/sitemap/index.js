require('babel-register')({
  presets: ['es2015', 'react'],
});


const Sitemap = require('react-router-sitemap').default;
const router = require('./Routes').default;

new Sitemap(router)
  .build('https://mi-awesome-website.com')
  .save('./public/sitemap.xml');
