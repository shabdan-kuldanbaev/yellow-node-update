'use client';

import { createContext } from 'react';

export const AppContext = createContext();

export const IntroSectionContext = createContext(null);

export const PageClustersContext = createContext({
  pageClusters: [],
  setPageClusters: () => {},
});
