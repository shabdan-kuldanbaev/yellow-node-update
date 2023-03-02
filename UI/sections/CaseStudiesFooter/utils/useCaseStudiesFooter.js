import get from 'lodash/get';
import last from 'lodash/last';
import { useSelector } from 'react-redux';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { selectComponents } from 'redux/selectors/layout';
import {
  CASES_BLACK_ICONS,
  socialNetworksWhite,
  socialNetworksBlack,
} from './data';

export const useCaseStudiesFooter = ({
  type,
  pathname,
}) => {
  const { main: contentModules } = useSelector(selectComponents);

  const lastContentModule = last(contentModules);
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

  const footerStyle = footerBackgroundImage ? { backgroundImage: `url(${footerBackgroundImage})` } : {};

  const socialNetworks = CASES_BLACK_ICONS.includes(type)
    ? socialNetworksBlack
    : socialNetworksWhite;

  return {
    type,
    title,
    buttonTitle,
    slug,
    pathname,
    footerStyle,
    socialNetworks,
  };
};
