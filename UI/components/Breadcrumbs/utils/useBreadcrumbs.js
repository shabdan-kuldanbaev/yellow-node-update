import cn from 'classnames';
import styles from '../styles.module.scss';

export default ({
  className,
  breadcrumbs,
  dark,
}) => {
  const classNames = cn(styles.breadcrumbs, className, { [styles.dark]: dark });

  const items = [
    { to: '/', title: 'Home' },
    ...(breadcrumbs || []).map(({ to, title }) => ({ to: to.path || to, title })),
  ];

  return {
    className: classNames,
    breadcrumbs: items,
  };
};
