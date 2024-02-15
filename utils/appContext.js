import { createContext } from 'react';

export const AppContext = createContext();

export const PageFetchContext = createContext({
  pageFetchQuery: null,
  setPageFetchQuery: () => {},
});

export const IntroSectionContext = createContext(null);
