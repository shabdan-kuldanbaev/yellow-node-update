import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default (data = []) => data.contentModules.length > 0 && data.contentModules.map((tabSection) => {
  const {
    title: tabTitle,
    contentModules,
  } = getDocumentFields(tabSection, [
    'title',
    'contentModules',
  ]);

  const texts = contentModules.map(({ fields }) => (fields.text));
  const link = getDocumentFields(get(contentModules, '[2]'));

  return {
    tabTitle,
    texts,
    link,
  };
});
