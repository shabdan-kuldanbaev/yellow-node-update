import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const useDefaultIntro = ({
  type,
  introSection,
  data,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  const {
    title,
    subtitle,
    description,
    images,
    contentModules,
    imagesBundles,
  } = getDocumentFields(
    get(data, 'contentModules[0]', {}),
    [
      'title',
      'subtitle',
      'description',
      'images',
      'contentModules',
      'imagesBundles',
    ],
  );

  const { contentModules: experiences } = getDocumentFields(
    get(data, 'contentModules[1]', {}),
    ['contentModules'],
  );
  const downloadLink = getDocumentFields(get(contentModules, '[0]'));
  const appLogoUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[1]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const appBackgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(images, '[0]', '')),
    { fm: 'png', fl: 'png8' },
  );
  const backgroundImageUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'images[0]', '')),
    { fm: 'png' },
  );
  const style = backgroundImageUrl ? { backgroundImage: `url(${backgroundImageUrl})` } : {};

  const imagesBundlesWithUrls = imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];

  const displayProjectLink = !isMobileResolution && downloadLink;
  const displayProjectLinkMobile = isMobileResolution && downloadLink;

  return {
    type,
    style,
    introSection,
    experiences,
    downloadLink,
    appLogoUrl,
    appBackgroundImageUrl,
    title,
    subtitle,
    description,
    imagesBundlesWithUrls,
    displayProjectLink,
    displayProjectLinkMobile,
  };
};
