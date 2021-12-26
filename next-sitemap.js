const siteUrl = 'https://vamp.bynightstudios.com';

module.exports = {
  siteUrl,
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  generateRobotsTxt: true,
  // Default transformation function
  transform: async (config, path) => {
    return {
      loc: path, // => this will be exported as http(s)://<config.siteUrl>/<path>
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  additionalPaths: async config => [await config.transform(config, '/additional-page')],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`,
      `${siteUrl}/server-sitemap-1.xml`,
      `${siteUrl}/server-sitemap-2.xml`,
      `${siteUrl}/server-sitemap-3.xml`,
      `${siteUrl}/server-sitemap-4.xml`,
      `${siteUrl}/server-sitemap-5.xml`,
      `${siteUrl}/server-sitemap-6.xml`,
      `${siteUrl}/server-sitemap-7.xml`,
      `${siteUrl}/server-sitemap-8.xml`,
      `${siteUrl}/server-sitemap-9.xml`,
      `${siteUrl}/server-sitemap-10.xml`,
      `${siteUrl}/server-sitemap-11.xml`,
    ],
  },
};
