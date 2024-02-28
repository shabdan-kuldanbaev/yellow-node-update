import { notFound } from 'next/navigation';
import ArticleContainer from 'containers/Article';
import { getArticle } from 'utils/dataFetching/getArticle';
import { generateArticleMicrodata } from 'utils/metadata/article';

// TODO: Add static articles generation with revalidation
// export async function generateStaticParams() {}

export { generateArticleMetadata as generateMetadata } from 'utils/metadata/article';

export default async function Page({ params }) {
  const { slug } = params;

  const { data } = await getArticle(slug);

  if (!data) {
    notFound();
  }

  const { breadcrumbs, microdata } = generateArticleMicrodata({ article: data.article });

  return (
    <ArticleContainer
      data={data}
      breadcrumbs={breadcrumbs}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microdata, null, 2) }}
      />
    </ArticleContainer>
  );
}
