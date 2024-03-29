import { getDocumentFields } from 'utils/helper';

export default ({ type, figuresData }) => {
  const {
    contentModules: figures,
    text,
  } = getDocumentFields(
    figuresData,
    ['contentModules', 'text'],
  );

  return {
    text,
    type,
    figures,
    figuresData,
  };
};
