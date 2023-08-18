import { useMemo } from 'react';
import { getDocumentFields, getFileUrl, getImage } from 'utils/helper';

export default ({ data, type }) => {
  const {
    title: sectionTitle,
    description: sectionDescription,
    background,
  } = data;

  const content = useMemo(() => data.contentModules?.map((cont) => {
    const {
      title,
      description,
      images: rawImages,
      imagesBundles,
    } = getDocumentFields(cont);

    const images = rawImages?.map((img) => getImage(img));
    const imgBundleUrls = imagesBundles?.map((img) => getImage(img));

    return {
      title,
      description,
      images,
      imgBundleUrls,
    };
  }), [data]);

  const backgroundUrl = getFileUrl(background);
  const style = backgroundUrl ? { backgroundImage: `url(${backgroundUrl})` } : {};

  return {
    content,
    type,
    sectionTitle,
    sectionDescription,
    style,
  };
};
