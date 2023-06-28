import get from 'lodash/get';
import { getDocumentFields, getImage } from 'utils/helper';

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
  const isButtonFirstBlock = figuresData.fields?.entryName.includes('Button');

  const { title: buttonTitle } = !isButtonFirstBlock
    ? getDocumentFields(get(contentModules, '[1]', {}), ['title'])
    : getDocumentFields(get(contentModules, '[0]', {}), ['title']);

  return {
    type,
    introSection,
    title,
    description,
    image,
    buttonTitle,
    figuresData,
    handleOnCTAClick,
  };
};
