import { useEffect, useRef, useState } from 'react';
import autosize from 'autosize';

export default (props) => {
  const {
    handleOnChange,
    handleOnBlurEmail,
    isWithoutLabel,
    isRequired,
    isValidate,
    isAttached,
    isTextArea,
    style,
    ...rest
  } = props;

  const Component = isTextArea ? 'textarea' : 'input';

  const inputRef = useRef();
  const [isInputActive, setActive] = useState(false);
  const [isInputFocus, setFocus] = useState(false);

  const handleOnClick = () => {
    inputRef.current?.focus();
    setActive(true);
  };

  const handleOnFocus = () => setFocus(true);

  const handleOnBlur = () => {
    setFocus(false);
    setActive(false);

    if (rest.type === 'email' && rest.value !== '' && handleOnBlurEmail) {
      handleOnBlurEmail(rest.value);
    }
  };

  const handleOnOutsideClick = () => {
    rest.value === '' && setActive(false);
  };

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current) {
      autosize(inputRef.current);
    }
  }, [isTextArea]);

  useEffect(() => {
    if (isTextArea && inputRef && inputRef.current && rest.value === '') {
      if (inputRef.current?.style.height !== 'auto') {
        inputRef.current.style.height = 'auto';
      }
    }
  }, [rest.value, isTextArea]);

  return ({
    Component,
    inputRef,
    handleOnFocus,
    handleOnBlur,
    handleOnClick,
    handleOnOutsideClick,
    isInputActive,
    isInputFocus,
    ...props,
  });
};
