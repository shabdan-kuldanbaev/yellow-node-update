import { useSelector } from 'react-redux';
import { selectComponents, selectMetaData } from 'redux/selectors/layout';
import { getDocumentFields, rootUrl } from 'utils/helper';
import { pagesBreadcrumbs } from 'utils/breadcrumbs';

export default function useProps({
  type,
  ...rest
}) {
  const pageData = useSelector(selectComponents);
  const metaData = useSelector(selectMetaData);

  const { main: contentModules } = pageData;
  const { text } = getDocumentFields(contentModules[0], ['text']);

  const breadcrumbs = pagesBreadcrumbs.technicalPage(type);

  const pageMetadata = {
    ...metaData,
    url: `${rootUrl}/${type}`,
  };

  const { updatedAt } = contentModules[0].sys;

  return {
    updatedAt,
    breadcrumbs,
    pageMetadata,
    text,
    type,
    ...rest,
  };
}
