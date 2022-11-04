import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export const getTabBlocks = (tabsData = []) => tabsData.contentModules.map((tabSection) => {
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
