import * as builder from 'xmlbuilder';
import dayjs from 'dayjs';
import {
  getMainLinksForSitemap,
  rootUrl,
  getDocumentFields,
} from 'utils/helper';
import { ROUTES, CASE_STUDIES_SLUGS } from 'utils/constants';
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
          select: ['fields.slug', 'fields.updatedAt'],
        },
      }),
      contentfulClient.getEntries({
        contentType: 'page',
        searchType: '[match]',
        additionalQueryParams: {
          'fields.slug[in]': CASE_STUDIES_SLUGS.join(','),
          select: ['fields.slug'],
        },
      }),
    ]);

    const postLinks = articles.items.map((link) => {
      const { slug, updatedAt } = getDocumentFields(link, ['slug', 'updatedAt']);

      return ({
        path: ROUTES.article.getRoute(slug).path,
        updatedAt: getDate(Date.parse(updatedAt)),
      });
    });

    const caseStudiesLinks = pages.items.map((caseStudy) => {
      const { slug } = getDocumentFields(caseStudy, ['slug']);

      return ({
        path: ROUTES.portfolio.getRoute(slug).path,
        updatedAt: getDate(new Date()),
      });
    });

    const customBlogs = ROUTES.blog.categories.map((blog) => ({
      path: ROUTES.blog.getRoute(blog.slug).path,
      updatedAt: getDate(new Date()),
    }));

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
        ...getMainLinksForSitemap(getDate(new Date('2021-05-12'))),
        ...caseStudiesLinks,
        ...postLinks,
        ...customBlogs,
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
    errorHelper.handleError({
      error,
      message: 'Error in the Sitemap.getInitialProps function',
    });
  }

  return {
    props: {},
  };
};

export default Sitemap;
