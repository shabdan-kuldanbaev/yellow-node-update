import get from 'lodash/get';
import { getDocumentFields, getImage } from 'utils/helper';

export default (data = []) => data?.map((tabSection) => {
  const {
    title: tabTitle,
    contentModules,
  } = getDocumentFields(tabSection, [
    'title',
    'contentModules',
  ]);

  const texts = contentModules?.map(({ fields }) => (fields.text));
  const content = contentModules?.map((module) => {
    const {
      text,
      images,
      imagesBundles: bundles,
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

    const [imageUrl] = (images || []).map(getImage);
    const imagesBundles = (bundles || []).map(getImage);
    const { url: prototypeUrl } = getDocumentFields(get(extraModule, '[0]'), ['url']);

    return {
      text,
      imageUrl,
      prototypeUrl,
      imagesBundles,
    };
  });

  const link = contentModules?.find((item) => item.sys.contentType.sys.id === 'link');

  return {
    tabTitle,
    texts,
    content,
    link,
  };
});
