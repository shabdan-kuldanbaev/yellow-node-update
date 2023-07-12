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
  const isCTA = links?.[1];

  // const {
  //   buttonTitle: ctaButtonTitle,
  //   files: ctaFiles,
  //   title: ctaTitle,
  //   type: ctaType,
  // } = getDocumentFields(
  //   links?.[1],
  //   [
  //     'buttonTitle',
  //     'title',
  //     'files',
  //   ],
  // );

  // const downloadLink = getFileUrl(ctaFiles?.[0]);

  const ctaProps = {
    sectionRef: introSection,
    data: links?.[1],
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
    ctaProps,
    isCTA,
  };
};
