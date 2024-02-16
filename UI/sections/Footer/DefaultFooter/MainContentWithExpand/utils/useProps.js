'use client';

import { useState } from 'react';

export default ({ mainContent }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => () => setActiveIndex(index);

  return {
    footerLinksData: mainContent,
    handleClick,
    activeIndex,
  };
};
