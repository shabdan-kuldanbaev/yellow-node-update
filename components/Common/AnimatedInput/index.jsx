import React, {
  useRef,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';
import autosize from 'autosize';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';
import styles from './styles.module.scss';

const AnimatedInput = ({
  value,
  handleOnChange,
  placeholder,
  type,
  handleOnBlurEmail,
  isWithoutLabel,
  isRequired,
  isValidate,
  isAttached,
  isTextArea,
}) => {
  const { asPath } = useRouter();
  const inputRef = useRef();
  const [isInputActived, setActive] = useState(false);
  const [isInputFocus, setFocus] = useState(false);
  const animatedInput = cn({
    [styles.animatedInput]: true,
    [styles.isRequired]: isRequired || isAttached,
    [styles.isValidate]: !isValidate,
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
    setActive(false);
    if (type === 'email' && value !== '') handleOnBlurEmail && handleOnBlurEmail(value);
  };

  const handleOnOutsideClick = () => {
    value === '' && setActive(false);
  };

  const inputOptions = {
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    ref: inputRef,
    placeholder: isWithoutLabel && placeholder,
    type: 'text',
    id: value,
    value,
    onChange: handleOnChange,
    autoFocus: (asPath === ROUTES.contact.path && placeholder === 'Name *'),
  };

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current) {
      autosize(inputRef.current);
    }
  }, []);

  return (
    <OutsideClickHandler onOutsideClick={handleOnOutsideClick}>
      <div className={animatedInput} onClick={handleOnClick}>
        {!isWithoutLabel && <label htmlFor={value}>{placeholder}</label>}
        {isTextArea ? <textarea {...inputOptions} rows={1} /> : <input {...inputOptions} />}
        {isRequired && <span className={styles.required}>*</span>}
        {!isValidate && value !== '' && <span className={styles.invalid}>INVALID</span>}
      </div>
    </OutsideClickHandler>
  );
};

AnimatedInput.defaultProps = {
  isWithoutLabel: false,
  handleOnBlurEmail: null,
  type: '',
  isRequired: false,
  isAttached: false,
  isTextArea: false,
};

AnimatedInput.propTypes = {
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
};

export default AnimatedInput;
