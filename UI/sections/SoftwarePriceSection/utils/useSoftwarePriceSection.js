import { getDocumentFields } from 'utils/helper';

export const useSoftwarePriceSection = ({ type, section }) => {
  const {
    contentModules,
    ...rest
  } = getDocumentFields(
    section,
  );

  return {
    ...rest,
    type,
  };
};
