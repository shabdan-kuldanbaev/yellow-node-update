import dayjs from 'dayjs';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import { contentfulClient } from 'utils/contentful/client';
import { handleError } from 'utils/error';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { routes } from 'utils/routes';

const excludedPages = [
  routes.signatureGenerator.slug,
  routes.notFound.slug,
  routes.bookCall.slug,
];

const getDate = (date) => dayjs(date).format('YYYY-MM-DD');

const generateSitemap = (data) => data.map((item) => {
  const isHomepage = item.path === '';

  return ({
    url: `${rootUrl}${item.path}`,
    lastModified: item.updatedAt,
    changeFrequency: isHomepage ? 'always' : 'weekly',
    priority: isHomepage ? 1 : 0.5,
  });
});

export default async function sitemap() {
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
        path: routes.article.getRoute(slug).path,
        updatedAt: getDate(Date.parse(updatedAt)),
      });
    });

    const pageLinks = pages.items.map((page) => {
      const { slug, 'sys.updatedAt': updatedAt } = getDocumentFields(page, ['slug', 'sys.updatedAt']);

      return ({
        path: CASE_STUDIES_SLUGS.includes(slug) ? routes.portfolio.getRoute(slug).path : routes.fromRoot(slug),
        updatedAt: getDate(Date.parse(updatedAt)),
      });
    });

    return generateSitemap([...pageLinks, ...postLinks]);
  } catch (error) {
    handleError({
      error,
      message: 'Error in the Sitemap.getInitialProps function',
    });

    return [];
  }
}
