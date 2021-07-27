import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export const getStorySectionProps = (data) => {
  const { contentModules, text, title } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
  );
  const { contentModules: videoModule } = getDocumentFields(
    get(data, 'contentModules[1]'),
  );
  const { description, title: photoCaption, images } = getDocumentFields(
    get(contentModules, '[0]', {}),
  );
  const imageUrl = getFileUrl(
    get(images, '[0]', {}),
  );
  const { url: videoUrl } = getDocumentFields(get(videoModule, '[0]'));

  return {
    text,
    title,
    description,
    photoCaption,
    imageUrl,
    videoUrl,
  };
};
