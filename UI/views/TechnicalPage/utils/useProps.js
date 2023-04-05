import { getDocumentFields, rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';
import { useFetchPageQuery } from 'redux/apis/page';

export default function useProps({
  type,
  ...rest
}) {
  const { data = {}, isLoading } = useFetchPageQuery(type);
  const { contentModules = [], metaData } = data;

  const textModule = contentModules[0] || {};

  const { text } = getDocumentFields(textModule, ['text']);

  const breadcrumbs = pagesBreadcrumbs.technicalPage(type);

  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/${type}`,
  };

  const { sys: { updatedAt } = {} } = textModule;

  return {
    updatedAt,
    breadcrumbs,
    pageMetadata,
    text,
    type,
    ...rest,
  };
}
