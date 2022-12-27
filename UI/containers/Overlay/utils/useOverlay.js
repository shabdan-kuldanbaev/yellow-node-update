import cn from 'classnames';
import styles from '../Overlay.module.scss';

export default ({
  className: classes,
  ...props
}) => {
  const className = cn(styles.overlay, classes);

  return {
    className,
    ...props,
  };
};
