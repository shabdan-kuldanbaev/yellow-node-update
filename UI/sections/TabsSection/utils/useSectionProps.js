import React, { useState } from 'react';
import getTabBlocks from './getTabBlocks';

export default ({
  data,
  type,
  handleOnCTAClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = getTabBlocks(data);

  const handleOnClick = (index) => () => setActiveIndex(index);

  return {
    handleOnClick,
    handleOnCTAClick,
    tabs,
    activeIndex,
    data,
    type,
  };
};
