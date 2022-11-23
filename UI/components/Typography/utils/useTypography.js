import cn from 'classnames';
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

export const useTypography = ({
  variant,
  isBold,
  className,
  children,
  size,
  onClick,
  tabIndex,
  role,
  ...anotherProps
}) => {
  const Tag = TYPOGRAPHY_TAGS[variant] || variant;
  const classes = cn(className, styles[size], {
    [styles.boldText]: isBold,
  });

  return {
    Tag,
    children,
    classes,
    onClick,
    tabIndex,
    role,
    anotherProps,
  };
};
