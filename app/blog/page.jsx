import { notFound } from 'next/navigation';
import BlogContainer from 'UI/views/Blog';
import { ARTICLES_NUMBER_PER_PAGE } from 'utils/constants';
import { getArticlesList } from 'utils/dataFetching/getArticlesList';
import { getBlogTags } from 'utils/dataFetching/getBlogTags';
import { getPage } from 'utils/dataFetching/getPage';
import { routes } from 'utils/routes';

const checkIfSlugIsTag = (tags, slug) => !!tags.find(({ slug: tagSlug }) => slug === tagSlug);

export default async function Page({ searchParams }) {
  const { data: { metaData } } = await getPage(routes.blog.slug);

  const { page = 1, category = '' } = searchParams;

  const { data: tagList } = await getBlogTags();
  const isTag = checkIfSlugIsTag(tagList, category);

  if (category && !isTag) {
    notFound();
  }

  const query = {
    isTag,
    slug: category,
    skip: ((page === 1) ? 0 : (page - 1) * ARTICLES_NUMBER_PER_PAGE - 1),
    limit: page === 1 ? ARTICLES_NUMBER_PER_PAGE - 1 : ARTICLES_NUMBER_PER_PAGE,
  };

  const { data: { items: articles, total } } = await getArticlesList(query);

  return (
    <BlogContainer
      articles={articles}
      totalArticles={total}
      currentPage={page}
      tagsList={tagList}
      metaData={metaData}
    />
  );
}
