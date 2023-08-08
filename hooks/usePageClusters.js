import { useGetArticleQuery } from 'redux/apis/blog';
import { useFetchPageQuery } from 'redux/apis/page';
import { getDocumentFields } from 'utils/helper';

export default function usePageClusters(slug) {
  const { data: { article } = {} } = useGetArticleQuery({ slug });
  const { clusters: articleClusters } = getDocumentFields(article, ['clusters']);

  const { data: pageData = {} } = useFetchPageQuery(slug);
  const { clusters: pageClusters } = pageData;

  return [
    ...(articleClusters || []),
    ...(pageClusters || []),
  ];
}
