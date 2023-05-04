import { getDocumentFields } from 'utils/helper';

export default function useProps({
  section,
  ...restProps
}) {
  const {
    title,
    subtitle,
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'subtitle',
      'contentModules',
    ],
  );

  const { url: calendlyEventUrl } = getDocumentFields(contentModules[1], ['url']);
  console.log('🚀 ~ file: index.js:21 ~ calendlyEventUrl:', calendlyEventUrl);

  return {
    title,
    subtitle,
    contentModules,
    calendlyEventUrl,
    ...restProps,
  };
}
