import cn from 'classnames';
import styles from '../CheckWithText.module.scss';

export default ({ className: classes, ...rest }) => {
  const className = cn(styles.card, classes);

  return {
    className,
    ...rest,
  };
};
