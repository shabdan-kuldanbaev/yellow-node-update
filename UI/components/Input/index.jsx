import React from 'react';
import PropTypes from 'prop-types';
import useInput from './useInput';
import styles from './styles.module.scss';

const Input = (props) => {
  const {
    Component,
    value,
    style,
    isRequired,
    isAttached,
    isWithoutLabel,
    placeholder,
    className,
    inputOptions,
    errorMessages,
    type,
    ...rest
  } = useInput(props);

  return (
    <div
      className={className}
      role="textbox"
      tabIndex="0"
    >
      {rest.isTextArea
        ? (
          <Component
            {...inputOptions}
            rows={1}
          />
        )
        : (
          <Component
            {...inputOptions}
          />
        )}
      {!isWithoutLabel && (
        <label htmlFor={value}>
          {placeholder}
        </label>
      )}
      {isRequired && (
        <span className={styles.isRequired}>
          *
        </span>
      )}
      <span className={styles.error}>
        {errorMessages[type]}
      </span>
    </div>
  );
};

Input.defaultProps = {
  isWithoutLabel: false,
  handleOnBlurEmail: null,
  type: null,
  isRequired: false,
  isAttached: false,
  isTextArea: false,
  style: '',
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  type: PropTypes.string,
  handleOnBlurEmail: PropTypes.func,
  isWithoutLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  isAttached: PropTypes.bool,
  isTextArea: PropTypes.bool,
  style: PropTypes.string,
};

export default Input;
