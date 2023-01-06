import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({
  introSection,
  section,
  type,
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
  const figuresData = get(contentModules, '[0]', {});

  return {
    type,
    introSection,
    title,
    description,
    imageUrl,
    figuresData,
  };
};
