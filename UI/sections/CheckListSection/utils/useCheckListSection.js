import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default ({
  sectionData,
  type,
  handleOnCTAClick,
  ...rest
}) => {
  const {
    title,
    description,
    contentModules,
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

  const link = get(contentModules, '[1]');

  const { contentModules: listData } = getDocumentFields(get(contentModules, '[0]', []));
  const list = (listData || []).map((item) => {
    const { title: itemTitle } = getDocumentFields(item, ['title']);

    return itemTitle;
  });

  return {
    title,
    description,
    view,
    list,
    link,
    type,
    handleOnCTAClick,
    ...rest,
  };
};
