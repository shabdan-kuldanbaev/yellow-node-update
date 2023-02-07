import get from 'lodash/get';
import { getDocumentFields, getImage } from 'utils/helper';

export const useImageSection = ({ data, type }) => {
  const { title, description } = data;

  const { imagesBundles } = getDocumentFields(get(data, 'contentModules[0]'), ['imagesBundles']);

  const imagesUrl = imagesBundles?.map((image) => getImage(image));

  const descriptions = description.split('||');

  return {
    title,
    descriptions,
    type,
    data,
    imagesUrl,
  };
};
