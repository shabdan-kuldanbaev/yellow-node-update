import get from 'lodash/get';
import last from 'lodash/last';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const getFooterProps = (currentProject) => {
  const lastContentModule = last(currentProject);
  const {
    background,
    contentModules: footerContentModules,
  } = getDocumentFields(
    lastContentModule,
    ['background', 'contentModules'],
  );
  const {
    title,
    buttonTitle,
    slug,
  } = getDocumentFields(
    get(footerContentModules, '[0]', {}),
    [
      'title',
      'buttonTitle',
      'slug',
    ],
  );
  const footerBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(background),
    { fm: 'png' },
  );

  return {
    title,
    buttonTitle,
    slug,
    footerBackgroundImage,
  };
};
