import { CASE_STUDIES } from 'utils/constants';

export const isContentVideo = (type) => [
  CASE_STUDIES.fairy,
  CASE_STUDIES.balzano,
  CASE_STUDIES.mobileBudgetingApp,
  CASE_STUDIES.forexTradingPlatform,
  CASE_STUDIES.metapix,
  'why-us',
].includes(type);
