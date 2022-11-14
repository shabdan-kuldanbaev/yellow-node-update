import cn from 'classnames';
import { TYPOGRAPHY_TAGS } from './utils';
import styles from './styles.module.scss';

export const useTypography = ({
  variant,
  isBold,
  className,
  children,
  size,
  onClick,
  tabIndex,
  role,
}) => {
  const TitleTag = TYPOGRAPHY_TAGS[variant] || variant;
  const classes = cn(className, styles[size], {
    [styles.boldText]: isBold,
  });

  return {
    TitleTag,
    children,
    classes,
    onClick,
    tabIndex,
    role,
  };
};
