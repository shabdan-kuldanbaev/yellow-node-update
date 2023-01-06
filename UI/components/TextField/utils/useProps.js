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
    ...rest
  } = props;

  const Component = textarea ? 'textarea' : 'input';
  const ref = useRef(null);

  const className = cn(classname, styles.input, {
    [styles[style]]: style,
    [styles.attached]: attached,
  });

  const options = {
    ref,
    rows: textarea && 1,
    ...rest,
  };

  useEffect(() => {
    if (textarea && ref && ref?.current) autosize(ref?.current);
  }, [textarea]);

  return {
    Component,
    className,
    options,
    errorMessage,
    ...rest,
  };
};
