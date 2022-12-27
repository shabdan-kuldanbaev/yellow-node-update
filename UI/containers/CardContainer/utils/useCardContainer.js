import cn from 'classnames';
import styles from '../CardContainer.module.scss';

export default ({
  children,
  className: classes,
  noBackground,
  ...rest
}) => {
  const className = cn(styles.cardContainer, classes, {
    [styles.noBackground]: noBackground,
  });

  return {
    children,
    className,
    ...rest,
  };
};
