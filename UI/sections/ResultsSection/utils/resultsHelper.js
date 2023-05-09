import { CASE_STUDIES } from 'utils/constants';

export const isContentVideo = (type) => [
  CASE_STUDIES.fairy,
  CASE_STUDIES.balzano,
  CASE_STUDIES.mobileBudgetingApp,
].includes(type);
