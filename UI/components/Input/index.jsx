import React from 'react';
import PropTypes from 'prop-types';
import useInput from './utils/useInput';
import styles from './styles.module.scss';
import { errorMessages } from './utils/patterns';

const Input = (props) => {
  const {
    Component,
    className,
    inputOptions,
    isRequired,
    type,
    value,
    placeholder,
    isWithoutLabel,
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
      <span className={styles.error}>
        {isRequired && value.length === 0 ? errorMessages.required : errorMessages[type]}
      </span>
    </div>
  );
};

Input.defaultProps = {
  isWithoutLabel: false,
  handleOnBlurEmail: null,
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
