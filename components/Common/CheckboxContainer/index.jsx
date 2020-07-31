import React from 'react';
import PropTypes from 'prop-types';
import { LinkWrapper } from 'components';
import styles from './styles.module.scss';

export const CheckboxContainer = ({
  text,
  isThereLink,
  linkText,
}) => (
  <label className={styles.checkbox}>
    <span>{text}</span>
    {isThereLink && (
      <span className={styles.link}>
        <LinkWrapper path="/privacy-policy" isLocalLink>
          {linkText}
        </LinkWrapper>
      </span>
    )}
    <input type="checkbox" />
    <span className={styles.checkmark} />
  </label>
);

CheckboxContainer.defaultProps = {
  isThereLink: false,
  linkText: '',
};

CheckboxContainer.propTypes = {
  text: PropTypes.string.isRequired,
  isThereLink: PropTypes.bool,
  linkText: PropTypes.string,
};
