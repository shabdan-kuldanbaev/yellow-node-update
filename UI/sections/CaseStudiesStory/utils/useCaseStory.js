import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({ type, data }) => {
  const { contentModules, text, title } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
  );
  const { contentModules: videoModule } = getDocumentFields(
    get(data, 'contentModules[1]'),
  );
  const { description, title: imageTitle, images } = getDocumentFields(
    get(contentModules, '[0]', {}),
  );
  const imageUrl = getFileUrl(get(images, '[0]', {}));
  const { url: videoUrl } = getDocumentFields(get(videoModule, '[0]'));

  return {
    type,
    text,
    title,
    description,
    imageTitle,
    imageUrl,
    videoUrl,
  };
};
