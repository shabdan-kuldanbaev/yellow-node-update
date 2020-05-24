import React, { useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const AnimatedInput = ({
  value,
  handleOnChange,
  placeholder,
  isValidate,
  type,
  handleOnBlurEmail,
  isWithoutLabel,
}) => {
  const inputRef = useRef();
  const [isInputActived, setActive] = useState(false);
  const [isInputFocus, setFocus] = useState(false);
  const animatedInput = cn({
    [styles.animatedInput]: true,
    [styles.active]: isInputActived,
    [styles.focus]: isInputFocus && isValidate,
    [styles.error]: !isValidate && value !== '',
    [styles.default]: !isInputFocus && isValidate && value !== '',
  });

  const handleOnClick = () => {
    inputRef.current.focus();
    setActive(true);
  };

  const handleOnFocus = () => {
    setFocus(true);
  };

  const handleOnBlur = () => {
    setFocus(false);
    if (type === 'email' && value !== '') handleOnBlurEmail(value);
  };

  const handleOnOutsideClick = () => {
    value === '' && setActive(false);
  };

  return (
    <OutsideClickHandler onOutsideClick={handleOnOutsideClick}>
      <div className={animatedInput} onClick={handleOnClick}>
        {!isWithoutLabel && <label htmlFor={value}>{placeholder}</label>}
        <input
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={inputRef}
          placeholder={isWithoutLabel && !isInputActived ? placeholder : ''}
          type="text"
          id={value}
          value={value}
          onChange={handleOnChange}
        />
      </div>
    </OutsideClickHandler>
  );
};

AnimatedInput.defaultProps = {
  isWithoutLabel: false,
};

AnimatedInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  isValidate: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  handleOnBlurEmail: PropTypes.func.isRequired,
  isWithoutLabel: PropTypes.bool,
};

export default AnimatedInput;
