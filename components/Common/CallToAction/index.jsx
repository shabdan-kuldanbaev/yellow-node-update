import React from 'react';
import PropTypes from 'prop-types';
import { ButtonMore } from 'components';
import styles from './styles.module.scss';

export const CallToAction = ({
  title,
  subtitle,
  buttonTitle,
  href,
  type,
}) => (
  <div className={styles[type]}>
    <h2 className={styles.h2}>{title}</h2>
    {subtitle && <p className={styles.p}>{subtitle}</p>}
    <ButtonMore
      href={href}
      title={buttonTitle}
      buttonStyle={styles.button}
    />
  </div>
);

CallToAction.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
