import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';

export default ({
  sectionData,
  type,
  handleOnCTAClick,
}) => {
  const {
    contentModules,
    title,
    description,
    subtitle,
    view,
  } = getDocumentFields(
    sectionData,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
    ],
  );

  const { contentModules: services } = getDocumentFields(get(contentModules, '[0]', []));
  // const cards = contentModules.map((item) => {});

  const ctalink = getDocumentFields(get(contentModules, '[1]'));

  return {
    type,
    // cards,
    ctalink,
  };
};
