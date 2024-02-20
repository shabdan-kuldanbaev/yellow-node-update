'use client';

import { useState } from 'react';
import { mainContent as mainContentData } from '../../utils/data';

export default ({ mainContent = mainContentData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => () => setActiveIndex(index);

  return {
    footerLinksData: mainContent,
    handleClick,
    activeIndex,
  };
};
