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
    ...rest
  } = props;

  const Component = textarea ? 'textarea' : 'input';
  const ref = useRef(null);

  const className = cn(classname, styles.input, {
    [styles[style]]: style,
    [styles.attached]: attached,
  });

  useEffect(() => {
    if (textarea && ref && ref?.current) autosize(ref?.current);
  }, [textarea]);

  const options = {
    ref,
    rows: textarea && 1,
    ...rest,
    ...register(name),
  };

  return {
    Component,
    className,
    options,
    errorMessage,
    ...rest,
  };
};
