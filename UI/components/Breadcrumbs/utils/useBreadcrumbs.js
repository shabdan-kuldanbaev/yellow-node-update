import cn from 'classnames';
import styles from '../styles.module.scss';

export default ({
  className,
  breadcrumbs = [],
  dark,
}) => {
  const classNames = cn(styles.breadcrumbs, className, { [styles.dark]: dark });

  return {
    className: classNames,
    breadcrumbs,
  };
};
