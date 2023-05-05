import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const useWhyUsIntro = ({
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
  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const secondImageUrl = getFileUrl(get(images, '[1]', {}));
  const figuresData = get(contentModules, '[0]', {});

  const titleParagraphs = title?.split('||');

  return {
    type,
    introSection,
    titleParagraphs,
    description,
    imageUrl,
    figuresData,
    handleOnCTAClick,
    secondImageUrl,
  };
};
