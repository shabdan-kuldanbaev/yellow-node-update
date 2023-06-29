import * as builder from 'xmlbuilder';
import dayjs from 'dayjs';
import {
  rootUrl,
  getDocumentFields,
} from 'utils/helper';
import { ROUTES, CASE_STUDIES_SLUGS } from 'utils/constants';
import { contentfulClient } from 'utils/contentful/client';
import { handleError } from 'utils/error';

const excludedPages = [
  'signature-generator',
  'not-found',
  'book-a-call',
];

const getDate = (date) => dayjs(date).format('YYYY-MM-DD');
const buildUrlObject = (data) => data.map((item) => {
  const isHomepage = item.path === '';

  return ({
    loc: { '#text': `${rootUrl}${item.path}` },
    lastmod: { '#text': item.updatedAt },
    changefreq: { '#text': isHomepage ? 'always' : 'weekly' },
    priority: { '#text': isHomepage ? '1.0' : '0.5' },
  });
});

const Sitemap = () => null;

export const getServerSideProps = async ({ res }) => {
  try {
    const [
      articles,
      pages,
    ] = await Promise.all([
      contentfulClient.getEntries({
        contentType: 'article',
        searchType: '[match]',
        additionalQueryParams: {
          select: ['fields.slug', 'sys.updatedAt'],
        },
      }),
      contentfulClient.getEntries({
        contentType: 'page',
        searchType: '[match]',
        additionalQueryParams: {
          'fields.slug[nin]': excludedPages.join(','),
          select: ['fields.slug', 'sys.updatedAt'],
        },
      }),
    ]);

    const postLinks = articles.items.map((link) => {
      const { slug, 'sys.updatedAt': updatedAt } = getDocumentFields(link, ['slug', 'sys.updatedAt']);

      return ({
        path: ROUTES.article.getRoute(slug).path,
        updatedAt: getDate(Date.parse(updatedAt)),
      });
    });

    const pageLinks = pages.items.map((page) => {
      const { slug, 'sys.updatedAt': updatedAt } = getDocumentFields(page, ['slug', 'sys.updatedAt']);

      return ({
        path: CASE_STUDIES_SLUGS.includes(slug) ? ROUTES.portfolio.getRoute(slug).path : ROUTES.fromRoot(slug),
        updatedAt: getDate(Date.parse(updatedAt)),
      });
    });

    const feedObject = {
      urlset: {
        '@xmlns': 'https://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:image': 'https://www.google.com/schemas/sitemap-image/1.1',
        '@xmlns:xsi': 'https://www.w3.org/2001/XMLSchema-instance',
        '@xmlns:video': 'https://www.google.com/schemas/sitemap-video/1.1',
        '@xmlns:news': 'https://www.google.com/schemas/sitemap-news/0.9',
        '@xmlns:mobile': 'https://www.google.com/schemas/sitemap-mobile/1.0',
        '@xmlns:pagemap': 'https://www.google.com/schemas/sitemap-pagemap/1.0',
        '@xmlns:xhtml': 'https://www.w3.org/1999/xhtml',
        '@xsi:schemaLocation': 'https://www.sitemaps.org/schemas/sitemap/0.9 https://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
        url: [],
      },
    };

    feedObject.urlset.url.push(
      ...buildUrlObject([
        ...pageLinks,
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
  } catch (error) {
    handleError({
      error,
      message: 'Error in the Sitemap.getInitialProps function',
    });
  }

  return {
    props: {},
  };
};

export default Sitemap;
