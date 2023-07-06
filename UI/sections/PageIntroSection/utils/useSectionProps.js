import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
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
  const figuresData = get(contentModules, '[0]', {});
  const { contentModules: links } = getDocumentFields(get(contentModules, '[1]', {}), ['contentModules']);

  const { buttonTitle } = getDocumentFields(links?.[0], ['buttonTitle']);

  const {
    buttonTitle: blockButtonTitle,
    files: blockFiles,
    title: blockTitle,
  } = getDocumentFields(
    links?.[1],
    [
      'buttonTitle',
      'title',
      'files',
    ],
  );

  const downloadLink = getFileUrl(blockFiles?.[0]);

  const bookProps = {
    sectionRef: introSection,
    ctaProps: {
      type: 'book',
      buttonTitle: blockButtonTitle,
      downloadLink,
      title: blockTitle,
      page: type,
    },
  };

  return {
    type,
    introSection,
    title,
    description,
    image,
    buttonTitle,
    figuresData,
    handleOnCTAClick,
    bookProps,
  };
};
