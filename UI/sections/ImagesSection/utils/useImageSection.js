import get from 'lodash/get';
import {
  getDocumentFields,
  getImage,
  getFileUrl,
} from 'utils/helper';

export const useImageSection = ({ data, type }) => {
  const { title, description } = data;

  const { imagesBundles } = getDocumentFields(get(data, 'contentModules[0]'), ['imagesBundles']);

  const imagesTest = imagesBundles?.map((image) => getImage(image));
  console.log('imagesTest: ', imagesTest);
  const imagesUrl = imagesBundles?.map((image) => getFileUrl(image));
  console.log('imagesUrl: ', imagesUrl);

  return {
    title,
    description,
    type,
    data,
    imagesUrl,
  };
};
