import { CASE_STUDIES } from 'utils/constants';

export const disabledSlider = (type) => ![
  CASE_STUDIES.generativeAi,
].includes(type);
