import get from 'lodash/get';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const useKeyFeatures = ({ features, type }) => {
  const containerBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(features, 'images[0]', {})),
    { fm: 'png' },
  );
  const containerStyle = containerBackgroundImage ? { backgroundImage: `url(${containerBackgroundImage})` } : {};
  const isEmptyContentModules = !get(features, 'contentModules');

  const content = features.contentModules?.map((data) => {
    const { title, text } = getDocumentFields(data);

    return { title, text };
  });

  return {
    type,
    content,
    containerStyle,
    isEmptyContentModules,
  };
};
