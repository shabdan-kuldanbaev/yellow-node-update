import cn from 'classnames';
import styles from '../NumberWithText.module.scss';

export default ({ className: classes, value: rawValue, ...rest }) => {
  const className = cn(styles.card, classes);

  const str = rawValue.toString();
  const pad = '00';
  const value = pad.substring(0, pad.length - str.length) + str;

  return {
    className,
    value,
    ...rest,
  };
};
