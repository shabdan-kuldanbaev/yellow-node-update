import { getDocumentFields, rootUrl } from 'utils/helper';
import { getBreadcrumbs } from 'utils/breadcrumbs';

export default function useProps({
  type,
  data,
  ...rest
}) {
  const {
    contentModules = [],
    metaData,
    pageTitle,
  } = data;

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
    title: pageTitle,
    ...rest,
  };
}
