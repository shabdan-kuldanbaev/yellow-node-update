import get from 'lodash/get';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default (data = []) => data?.map((tabSection) => {
  const {
    title: tabTitle,
    contentModules,
  } = getDocumentFields(tabSection, [
    'title',
    'contentModules',
  ]);

  const texts = contentModules.map(({ fields }) => (fields.text));
  const content = contentModules.map((module) => {
    const {
      text,
      images,
      imagesBundles,
      contentModules: extraModule,
    } = getDocumentFields(
      module,
      [
        'text',
        'images',
        'imagesBundles',
        'contentModules',
      ],
    );

    const imageUrl = getFileUrl(images?.[0]);
    const deviceFrameSrc = getFileUrl(imagesBundles?.[0]);
    const { url: prototypeUrl } = getDocumentFields(get(extraModule, '[0]'), ['url']);

    return {
      text,
      imageUrl,
      prototypeUrl,
      deviceFrameSrc,
    };
  });

  const link = getDocumentFields(get(contentModules, '[2]'));

  return {
    tabTitle,
    texts,
    content,
    link,
  };
});
