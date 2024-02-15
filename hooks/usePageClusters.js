import { useContext } from 'react';
import { PageFetchContext } from 'utils/appContext';
import { getArticle } from 'utils/dataFetching/getArticle';
import { getPage } from 'utils/dataFetching/getPage';
import { getDocumentFields } from 'utils/helper';

export default async function usePageClusters() {
  const { pageFetchQuery } = useContext(PageFetchContext);

  const { data: { article } = {} } = getArticle(pageFetchQuery);
  const { clusters: articleClusters } = getDocumentFields(article, ['clusters']);

  const { data: pageData = {} } = await getPage(pageFetchQuery);
  const { clusters: pageClusters } = pageData;

  return [
    ...(articleClusters || []),
    ...(pageClusters || []),
  ];
}
