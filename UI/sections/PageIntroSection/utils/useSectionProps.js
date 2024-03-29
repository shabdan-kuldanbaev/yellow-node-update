import get from 'lodash/get';
import {
  getDocumentFields,
  getImage,
} from 'utils/helper';

export default ({
  introSection,
  section,
  type,
  handleOnCTAClick,
}) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'images',
      'contentModules',
    ],
  );
  const image = getImage(get(images, '[0]', {}));

  const figuresData = contentModules?.find((module) => {
    const { contentModules: figures } = getDocumentFields(module, ['contentModules']);

    return figures;
  });

  const scrollBlock = contentModules?.find((module) => {
    const { type: linkType } = getDocumentFields(module, ['type']);

    return linkType === 'scroll-block';
  });

  const links = contentModules?.filter((module) => {
    const {
      type: linkType,
    } = getDocumentFields(module, [
      'type',
    ]);

    return linkType === 'button';
  });

  return {
    type,
    introSection,
    title,
    description,
    image,
    figuresData,
    handleOnCTAClick,
    scrollBlock,
    links,
  };
};
