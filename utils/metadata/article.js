import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getArticle } from 'utils/dataFetching/getArticle';
import { rootUrl } from 'utils/helper';
import { getPageMicrodata } from 'utils/microdata';
import { routes } from 'utils/routes';

export async function generateArticleMetadata({ params }) {
  const { slug } = params;
  const { data } = await getArticle(slug);

  if (!data) {
    return {};
  }

  const { article } = data;

  const {
    title,
    metaTitle: articleMetaTitle,
    metaDescription,
    publishedAt,
    tagsList,
    author,
    headImage: { url: imageUrl },
  } = article;

  const metaTitle = articleMetaTitle || `${title} | Yellow`;
  const description = metaDescription || `Read our new article about ${title}.`;
  const publishedTime = publishedAt || new Date();
  const keywords = tagsList.map((tag) => tag.title);
  const url = routes.article.getRoute(slug).path;
  const authorUrl = routes.person.getRoute(author.slug).path;

  return {
    metadataBase: new URL(rootUrl),
    title: metaTitle,
    description,
    keywords,
    url,
    authors: [{ name: author.fullName, url: authorUrl }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      images: [{ url: imageUrl }],
      publishedTime,
      tags: keywords,
      url,
    },
  };
}

export function generateArticleMicrodata({ article }) {
  const {
    slug,
    title,
    metaTitle,
    publishedAt,
    author,
    headImage: { url: imageUrl },
    oldBody,
    body,
  } = article;

  const articleData = {
    metaTitle,
    title,
    publishedAt,
    updatedAt: publishedAt,
    headImage: imageUrl,
    articleBody: oldBody || documentToPlainTextString(body),
    author,
  };
  const breadcrumbs = getBreadcrumbs(routes.article.slug, { title, slug });
  const microdata = getPageMicrodata(routes.article.slug, { breadcrumbs, microData: articleData });

  return { microdata, breadcrumbs };
}
