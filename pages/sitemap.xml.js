import * as builder from 'xmlbuilder';
import dayjs from 'dayjs';
import {
  getMainLinksForSitemap,
  rootUrl,
  getDocumentFields,
} from 'utils/helper';
import { ROUTES } from 'utils/constants';
import { contentfulClient } from 'utils/contentful/client';
import errorHelper from 'utils/error';

const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const buildUrlObject = (data) => data.map((item) => {
  const isHomepage = item.path === ROUTES.homepage.path;

  return ({
    loc: { '#text': `${rootUrl}${item.path}` },
    lastmod: { '#text': item.updatedAt },
    changefreq: { '#text': isHomepage ? 'always' : 'weekly' },
    priority: { '#text': isHomepage ? '1.0' : '0.5' },
  });
});

const Sitemap = () => (null);

Sitemap.getInitialProps = async ({ res }) => {
  try {
    const articles = await contentfulClient.getEntries({
      contentType: 'article',
      searchType: '[match]',
    });
    const projects = await contentfulClient.getEntries({
      contentType: 'project',
      searchType: '[match]',
    });
    const postLinks = articles.items.map((link) => {
      const { slug, publishedAt } = getDocumentFields(link, ['slug', 'publishedAt']);

      return ({
        path: ROUTES.article.getRoute(slug).path,
        updatedAt: getDate(Date.parse(publishedAt)),
      });
    });
    const projectLinks = projects.items.map((project) => {
      const { slug } = getDocumentFields(project, ['slug']);

      return ({
        path: ROUTES.portfolio.getRoute(slug).path,
        updatedAt: getDate(new Date()),
      });
    });
    const feedObject = {
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:image': 'http://www.google.com/schemas/sitemap-image/1.1',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xmlns:video': 'http://www.google.com/schemas/sitemap-video/1.1',
        '@xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
        '@xmlns:mobile': 'http://www.google.com/schemas/sitemap-mobile/1.0',
        '@xmlns:pagemap': 'http://www.google.com/schemas/sitemap-pagemap/1.0',
        '@xmlns:xhtml': 'http://www.w3.org/1999/xhtml',
        '@xsi:schemaLocation': 'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
        url: [],
      },
    };

    feedObject.urlset.url.push(
      ...buildUrlObject([
        ...getMainLinksForSitemap(getDate(new Date('2021-05-12'))),
        ...projectLinks,
        ...postLinks,
      ]),
    );

    const sitemap = builder.create(feedObject, { encoding: 'utf-8' });

    if (res) {
      res.setHeader('Cache-Control', 's-maxage=5, stale-while-revalidate');
      res.setHeader('Content-Type', 'application/xml');
      res.statusCode = 200;
      res.end(sitemap.end({ pretty: true }));
    }

    return;
  } catch (error) {
    errorHelper.handleError({
      error,
      message: 'Error in the Sitemap.getInitialProps function',
    });
  }
};

export default Sitemap;
