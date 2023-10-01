import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default ({
  sectionData,
  type,
  handleOnCTAClick,
  ...rest
}) => {
  const {
    contentModules,
    title,
    description,
    view,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  );

  const linkData = get(contentModules, '[1]');

  const { contentModules: listData } = getDocumentFields(get(contentModules, '[0]', []));
  const list = (listData || []).map((item) => getDocumentFields(item, ['title']).title);

  return {
    title,
    description,
    view,
    list,
    type,
    handleOnCTAClick,
    linkData,
    ...rest,
  };
};
