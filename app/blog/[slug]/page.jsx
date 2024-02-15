import { useContext } from 'react';
import { notFound } from 'next/navigation';
import ArticleContainer from 'containers/Article';
import { getArticle } from 'utils/dataFetching/getArticle';
import { PageFetchContext } from 'utils/appContext';

export default async function Page({ params }) {
  const { slug } = params;

  const { data } = await getArticle(slug);

  if (!data) {
    notFound();
  }

  const { setPageFetchQuery } = useContext(PageFetchContext);
  setPageFetchQuery(slug);

  return <ArticleContainer data={data} />;
}
