import cn from 'classnames';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from '../Button.module.scss';

export default ({
  dark,
  secondary,
  href,
  className: classes,
  ...rest
}) => {
  const Component = href ? (props) => <LinkWrapper {...props} /> : (props) => (
    <button
      type="button"
      {...props}
    />
  );

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
    path: href,
    ...rest,
  });
};
