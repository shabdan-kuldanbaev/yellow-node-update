import { useState } from 'react';
import { getDocumentFields } from 'utils/helper';
import get from 'lodash/get';
import getTabBlocks from './getTabBlocks';

export default ({
  section,
  type,
  handleOnCTAClick,
  data,
}) => {
  const {
    title,
    view,
    description,
    contentModules,
  } = getDocumentFields(
    section || data,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
    {
      isNormilized: (data && !Object.keys(data).includes('fields'))
      || (section && !Object.keys(section).includes('fields')),
    },
  );

  const [activeTab, setActiveTab] = useState(0);

  const tabList = getDocumentFields(get(contentModules, '[0]', ['contentModules', 'tabsHaveContentInBlocks']));

  let tabs;

  if (tabList.tabsHaveContentInBlocks) {
    tabs = getTabBlocks(tabList.contentModules);
  } else {
    tabs = tabList.contentModules.map((el, i) => getDocumentFields(get(tabList.contentModules, `[${i}]`, ['title', 'text'])));
  }

  const displayNames = tabList.contentModules.map((el, i) => getDocumentFields(get(tabList.contentModules, `[${i}]`, ['title', 'text'])).title);
  const linkAfterBlock = get(contentModules, '[1]', null);

  return {
    onChangeActiveTab: setActiveTab,
    handleOnCTAClick,
    tabs,
    activeTab,
    title,
    description,
    view,
    type,
    displayNames,
    linkAfterBlock,
    tabsHaveContentInBlocks: tabList.tabsHaveContentInBlocks,
  };
};
