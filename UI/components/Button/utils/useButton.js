import cn from 'classnames';
import styles from '../Button.module.scss';

export default ({
  dark,
  secondary,
  href,
  className: classes,
  ...rest
}) => {
  const Component = href ? 'a' : 'button';

  const className = cn(
    styles.button,
    classes,
    {
      [styles.secondary]: secondary,
      [styles.dark]: dark,
    },
  );

  return ({
    Component,
    className,
    href,
    ...rest,
  });
};
