import cn from 'classnames';
import { TYPOGRAPHY_TAGS } from './utils';
import styles from './styles.module.scss';

export const useTypography = ({
  variant,
  align,
  isBold,
  className,
  children,
  size,
}) => {
  const TitleTag = TYPOGRAPHY_TAGS[variant];
  const classes = cn(className, styles[size], {
    [styles.boldText]: isBold,
  });

  return {
    TitleTag,
    children,
    classes,
    align,
  };
};
