import { notFound } from 'next/navigation';
import ArticleContainer from 'containers/Article';
import { getArticle } from 'utils/dataFetching/getArticle';

export default async function Page({ params }) {
  const { slug } = params;

  const { data } = await getArticle(slug);

  if (!data) {
    notFound();
  }

  return <ArticleContainer data={data} />;
}
