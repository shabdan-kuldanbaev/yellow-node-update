import classNames from 'classnames';
import { Fragment } from 'react';
import LinkWrapper from 'UI/components/LinkWrapper';
import styles from '../Card.module.scss';

export default ({
  url,
  className: classes,
  withoutBackground,
  ...rest
}) => {
  const Wrapper = url
    ? ((props) => <LinkWrapper {...props} />)
    : (({
      path,
      className,
      imagesBundles,
      ...restWrapper
    // eslint-disable-next-line react/jsx-no-useless-fragment
    }) => <Fragment {...restWrapper} />);

  const className = classNames(styles.card, classes, {
    [styles.withoutBackground]: withoutBackground,
    [styles.withLink]: url,
  });

  return {
    Wrapper,
    className,
    withoutBackground,
    path: url,
    ...rest,
  };
};
