import React from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';
import useInput from './useInput';
import styles from './styles.module.scss';

const errorMessages = {
  email: 'Invalid mail address',
};

const patterns = {
  email: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$',
};

const Input = (props) => {
  const {
    Component,
    inputRef,
    handleOnChange,
    handleOnFocus,
    handleOnBlur,
    handleOnClick,
    handleOnOutsideClick,
    value,
    style,
    isRequired,
    isAttached,
    isValidate,
    isInputActive,
    isInputFocus,
    isWithoutLabel,
    placeholder,
    ...rest
  } = useInput(props);

  const className = cn(props.className, styles.input, {
    [styles[style]]: style,
    [styles.invalid]: !isValidate,
    [styles.isRequired]: isRequired || isAttached,
    [styles.active]: isInputActive,
    [styles.focus]: isInputFocus && isValidate,
    [styles.error]: !isValidate && value === '',
    [styles.default]: !isInputFocus && isValidate && value !== '',
  });

  const inputOptions = {
    value,
    id: value,
    ref: inputRef,
    type: rest.type ? rest.type : 'text',
    onBlur: handleOnBlur,
    onFocus: handleOnFocus,
    onChange: handleOnChange,
    placeholder: rest.placeholder,
    pattern: rest.type in patterns ? patterns[rest.type] : '',
  };

  return (
    <OutsideClickHandler onOutsideClick={handleOnOutsideClick}>
      <div
        className={className}
        onClick={handleOnClick}
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
              onChange={handleOnChange}
            />
          )}

        {!isWithoutLabel && value === '' && (
          <label
            htmlFor={value}
            className={styles.label}
          >
            {placeholder}
          </label>
        )}

        {isRequired && (
          <span className={styles.required}>
            *
          </span>
        )}

        <span className={styles.invalid}>
          {errorMessages[rest.type]}
        </span>
      </div>
    </OutsideClickHandler>
  );
};

Input.defaultProps = {
  isWithoutLabel: false,
  handleOnBlurEmail: null,
  type: '',
  isRequired: false,
  isAttached: false,
  isTextArea: false,
  style: '',
};

Input.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isValidate: PropTypes.bool.isRequired,
  type: PropTypes.string,
  handleOnBlurEmail: PropTypes.func,
  isWithoutLabel: PropTypes.bool,
  isRequired: PropTypes.bool,
  isAttached: PropTypes.bool,
  isTextArea: PropTypes.bool,
  style: PropTypes.string,
};

export default Input;
