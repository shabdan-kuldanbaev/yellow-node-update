import cn from 'classnames';
import padStart from 'lodash/padStart';
import styles from '../NumberWithText.module.scss';

export default ({ className: classes, value: rawValue, ...rest }) => {
  const className = cn(styles.card, classes);

  const str = rawValue.toString();
  const value = padStart(str, 2, '0');

  return {
    className,
    value,
    ...rest,
  };
};
