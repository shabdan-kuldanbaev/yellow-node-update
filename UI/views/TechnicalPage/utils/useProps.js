import { getDocumentFields, rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';
import { getPage } from 'utils/dataFetching/getPage';

export default async function useProps({
  type,
  ...rest
}) {
  const { data = {} } = await getPage(type);
  const { contentModules = [], metaData } = data;

  const textModule = contentModules[0] || {};

  const { text } = getDocumentFields(textModule, ['text']);

  const breadcrumbs = getBreadcrumbs(type);

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
