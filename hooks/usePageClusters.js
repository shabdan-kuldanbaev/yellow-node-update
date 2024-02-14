import { useContext } from 'react';
import { useGetArticleQuery } from 'store/apis/blog';
import { getPage } from 'utils/dataFetching/getPage';
import { PageFetchContext } from 'utils/appContext';
import { getDocumentFields } from 'utils/helper';

export default async function usePageClusters() {
  const { pageFetchQuery } = useContext(PageFetchContext);

  const { data: { article } = {} } = useGetArticleQuery(pageFetchQuery);
  const { clusters: articleClusters } = getDocumentFields(article, ['clusters']);

  const { data: pageData = {} } = await getPage(pageFetchQuery);
  const { clusters: pageClusters } = pageData;

  return [
    ...(articleClusters || []),
    ...(pageClusters || []),
  ];
}
