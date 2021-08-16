import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { ButtonMore } from 'components';
import styles from './styles.module.scss';

export const CallToAction = ({
  title,
  subtitle,
  buttonTitle,
  href,
  type,
  handleOnClick,
  className,
}) => (
  <div className={cn(styles[type], { [className]: className })}>
    <h3 className={styles.h3}>
      {title}
    </h3>
    {subtitle && (
      <p className={styles.p}>
        {subtitle}
      </p>
    )}
    <ButtonMore
      href={href}
      title={buttonTitle}
      buttonStyle={styles.button}
      handleOnClick={handleOnClick}
    />
  </div>
);

CallToAction.defaultProps = {
  href: '',
  handleOnClick: () => {},
  className: '',
};

CallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  href: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleOnClick: PropTypes.func,
  className: PropTypes.string,
};
