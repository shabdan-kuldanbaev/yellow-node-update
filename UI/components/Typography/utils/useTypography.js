import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsDesktop } from 'store/selectors/layout';
import styles from '../styles.module.scss';

export const TYPOGRAPHY_TAGS = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  span: 'span',
};

export const TYPOGRAPHY_SIZE = {
  caption12: 'caption',
  paragrapgh14: 'paragrapgh-s',
  paragrapgh16: 'paragrapgh-m',
  headline20: 'headline-xs',
  headline24: 'headline-s',
  headline38: 'headline-m',
  headline46: 'headline-l',
  headline56: 'headline-xl',
};

export const useTypography = ({
  variant = TYPOGRAPHY_TAGS.p,
  isBold,
  className,
  children,
  size = TYPOGRAPHY_SIZE.paragrapgh16,
  mobileSize,
  onClick,
  tabIndex,
  role,
  ...rest
}) => {
  const isDesktopResolution = useSelector(selectIsDesktop);

  const Tag = TYPOGRAPHY_TAGS[variant] || variant;

  const actualSize = (isDesktopResolution || !mobileSize) ? size : mobileSize;

  const classes = cn(styles.typography, className, styles[actualSize], {
    [styles.boldText]: isBold,
  });

  return {
    Tag,
    children,
    classes,
    onClick,
    tabIndex,
    role,
    ...rest,
  };
};
