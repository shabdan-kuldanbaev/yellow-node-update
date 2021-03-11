import * as builder from 'xmlbuilder';
import dayjs from 'dayjs';
import {
  getMainLinksForSitemap,
  rootUrl,
  getDocumentFields,
} from 'utils/helper';
import { ROUTES } from 'utils/constants';
import { contentfulClient } from 'utils/ContentfulClient';

const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const buildUrlObject = (data) => data.map((item) => ({
  loc: { '#text': `${rootUrl}${item.path}` },
  lastmod: { '#text': item.updatedAt.split('T')[0] },
  changefreq: { '#text': 'daily' },
  priority: { '#text': '1.0' },
}));

const Sitemap = () => (null);

Sitemap.getInitialProps = async ({ res }) => {
  try {
    const { items = [] } = await contentfulClient.getEntries({
      contentType: 'article',
      searchType: '[match]',
    });
    const postLinks = items.map((link) => {
      const { slug, publishedAt } = getDocumentFields(link, ['slug', 'publishedAt']);

      return ({
        path: ROUTES.article.path(slug),
        updatedAt: getDate(Date.parse(publishedAt)),
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
        ...getMainLinksForSitemap(getDate(new Date())),
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
    console.log(error);
  }
};

export default Sitemap;
