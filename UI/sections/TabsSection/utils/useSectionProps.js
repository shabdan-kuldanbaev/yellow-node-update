import { useState } from 'react';
import { getDocumentFields } from 'utils/helper';
import getTabBlocks from './getTabBlocks';

export default ({
  section,
  type,
  handleOnCTAClick,
}) => {
  const {
    title, view, description, contentModules,
  } = getDocumentFields(section, ['title', 'description', 'contentModules']);

  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = getTabBlocks(contentModules);

  const handleOnClick = (index) => () => setActiveIndex(index);

  return {
    handleOnClick,
    handleOnCTAClick,
    tabs,
    activeIndex,
    title,
    description,
    view,
    type,
  };
};
