import { notFound } from 'next/navigation';
import BlogContainer from 'UI/views/Blog';
import { ARTICLES_NUMBER_PER_PAGE } from 'utils/constants';
import { getArticlesList } from 'utils/dataFetching/getArticlesList';
import { getBlogTags } from 'utils/dataFetching/getBlogTags';
import { generateBlogMicrodata } from 'utils/metadata/blog';

export { generateBlogMetadata as generateMetadata } from 'utils/metadata/blog';

const checkIfSlugIsTag = (tags, slug) => !!tags.find(({ slug: tagSlug }) => slug === tagSlug);

export default async function Page({ searchParams }) {
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

  const { breadcrumbs, microdata } = generateBlogMicrodata({ tagsList: tagList, category });

  return (
    <BlogContainer
      articles={articles}
      totalArticles={total}
      currentPage={page}
      tagsList={tagList}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </BlogContainer>
  );
}
