import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default ({ type, data }) => {
  const {
    title,
    description,
    images,
    contentModules,
  } = data;

  const {
    contentModules: links,
    title: listTitle,
  } = getDocumentFields(get(contentModules, '[0]', []));

  const imageUrl = getFileUrl(get(images, '[0]', ''));

  const linksList = links?.map((module) => {
    const {
      title: linkTitle,
      url,
    } = getDocumentFields(module);

    return {
      linkTitle,
      url,
    };
  });

  return {
    type,
    title,
    description,
    listTitle,
    linksList,
    imageUrl,
  };
};
