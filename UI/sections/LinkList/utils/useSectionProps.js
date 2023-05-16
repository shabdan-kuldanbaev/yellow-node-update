import cn from 'classnames';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import styles from '../styles.module.scss';

export default ({
  section,
  type,
}) => {
  const {
    title,
    subtitle,
    description,
    contentModules,
  } = getDocumentFields(
    section,
    [
      'title',
      'subtitle',
      'description',
      'contentModules',
    ],
  );

  const { contentModules: linksData } = getDocumentFields(get(contentModules, '[0]', null), ['contentModules']);

  const className = cn(styles.section, styles[type]);

  const titleProps = {
    title,
    subtitle,
    description,
    className: styles.titleStyle,
  };

  const linksList = linksData?.map((module) => {
    const {
      slug: svgType,
      title: linkTitle,
      url,
    } = getDocumentFields(module);

    return {
      linkTitle,
      svgType,
      url,
    };
  });

  return {
    className,
    titleProps,
    linksList,
  };
};
