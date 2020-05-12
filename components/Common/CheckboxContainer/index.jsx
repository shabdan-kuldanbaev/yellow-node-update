import React from 'react';
import { LinkWrapper } from 'components';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export const CheckboxContainer = ({
  text,
  isThereLink,
  linkText,
}) => (
  <label className={styles.checkbox}>
    <span>{text}</span>
    {isThereLink && (
      <LinkWrapper path="/privacy-policy" isLocalLink>
        <span className={styles.link}>{linkText}</span>
      </LinkWrapper>
    )}
    <input type="checkbox" />
    <span className={styles.checkmark} />
  </label>
);

CheckboxContainer.defaultProps = {
  isThereLink: false,
};

CheckboxContainer.propTypes = {
  text: PropTypes.string.isRequired,
  isThereLink: PropTypes.bool,
  linkText: PropTypes.string.isRequired,
};
