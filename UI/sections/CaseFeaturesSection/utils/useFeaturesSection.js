import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const useFeaturesSection = ({ type, data }) => {
  const { contentModules, title, images } = data;

  const imageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]')),
    { fm: 'png', fl: 'png8' },
  );

  const featuresList = contentModules.map((feature) => {
    const { title: featureTitle, text } = getDocumentFields(feature);

    return {
      text,
      featureTitle,
    };
  });

  return {
    type,
    data,
    contentModules,
    title,
    imageUrl,
    featuresList,
  };
};
