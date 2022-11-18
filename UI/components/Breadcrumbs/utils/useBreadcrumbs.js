import cn from 'classnames';
import styles from '../styles.module.scss';

export default ({
  className,
  breadcrumbs,
}) => {
  const classNames = cn(styles.breadcrumbs, className);

  const items = [
    { to: '/', title: 'Home' },
    ...breadcrumbs.map(({ to, title }) => ({ to: to.path || to, title })),
  ];

  return {
    className: classNames,
    breadcrumbs: items,
  };
};
