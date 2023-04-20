import get from 'lodash/get';
import last from 'lodash/last';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { useFetchPageQuery } from 'redux/apis/page';
import {
  CASES_BLACK_ICONS,
  socialNetworks as socials,
} from './data';

export const useCaseStudiesFooter = ({
  type,
  pathname,
}) => {
  const { data: { contentModules } = {} } = useFetchPageQuery(type);

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

  const socialNetworks = socials.map((item) => ({
    name: item.title,
    icon: CASES_BLACK_ICONS.includes(type) ? item.iconDark : item.iconLight,
    href: item.link,
  }));

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
