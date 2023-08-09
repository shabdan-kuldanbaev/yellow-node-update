import { useContext } from 'react';
import { useGetArticleQuery } from 'redux/apis/blog';
import { useFetchPageQuery } from 'redux/apis/page';
import { PageFetchContext } from 'utils/appContext';
import { getDocumentFields } from 'utils/helper';

export default function usePageClusters() {
  const { pageFetchQuery } = useContext(PageFetchContext);

  const { data: { article } = {} } = useGetArticleQuery(pageFetchQuery);
  const { clusters: articleClusters } = getDocumentFields(article, ['clusters']);

  const { data: pageData = {} } = useFetchPageQuery(pageFetchQuery);
  const { clusters: pageClusters } = pageData;

  return [
    ...(articleClusters || []),
    ...(pageClusters || []),
  ];
}
