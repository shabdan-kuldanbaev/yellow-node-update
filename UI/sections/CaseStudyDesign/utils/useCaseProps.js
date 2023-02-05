import { useMemo } from 'react';
import { getDocumentFields, getImage } from 'utils/helper';

export default ({ data, type }) => {
  const content = useMemo(() => data?.contentModules?.map((cont) => {
    const {
      title,
      description,
      images,
    } = getDocumentFields(cont);

    const imagesUrls = images?.map((img) => getImage(img));

    return {
      title,
      description,
      imagesUrls,
    };
  }), []);

  return {
    content,
    type,
  };
};
