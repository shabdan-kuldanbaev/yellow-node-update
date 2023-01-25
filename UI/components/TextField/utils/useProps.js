import React, { useRef, useEffect } from 'react';
import cn from 'classnames';
import autosize from 'autosize';
import styles from '../styles.module.scss';

export default (props) => {
  const {
    textarea,
    style,
    classname,
    errorMessage,
    attached,
    register,
    name,
    placeholder,
    type,
    required,
    minLength,
    maxLength,
    ...restProps
  } = props;

  const Component = textarea ? 'textarea' : 'input';
  const inputRef = useRef(null);
  const inputRegister = register && register(name, {
    required,
    pattern: {
      value: type === 'email' && /\S+@\S+\.\S+/,
    },
    minLength,
    maxLength,
  });

  const className = cn(classname, styles.input, {
    [styles[style]]: style,
    [styles.attached]: attached,
  });

  const options = {
    ...restProps,
    ...inputRegister,
    required,
    placeholder,
    type,
    rows: textarea && 1,
    ref: register ? (el) => {
      inputRegister.ref(el);
      inputRef.current = el;
    } : inputRef,
  };

  useEffect(() => {
    if (textarea && inputRef && inputRef?.current) autosize(inputRef?.current);
  }, [textarea]);

  return {
    Component,
    className,
    options,
    errorMessage,
  };
};
