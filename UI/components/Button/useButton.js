import cn from 'classnames';
import styles from './styles.module.scss';

export default (props) => {
  const {
    dark,
    secondary,
    ...rest
  } = props;

  const Component = props.href ? 'a' : 'button';

  const className = cn(
    props.className,
    styles.button,
    {
      [styles.secondary]: secondary,
      [styles.dark]: dark,
    },
  );

  return ({
    Component,
    className,
    ...rest,
  });
};
