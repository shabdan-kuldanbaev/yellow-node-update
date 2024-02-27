'use client';

import { useEffect, useRef } from 'react';
import cn from 'classnames';

import styles from './Slider.module.scss';

export const NewSliderComponent = ({ onChange, className, ...props }) => {
  const inputRef = useRef();

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    const slider = inputRef.current;

    slider.addEventListener('input', ({ target: { value } }) => {
      const progress = (value / slider.max) * 100;

      slider.style.background = `linear-gradient(to right, #ffeb33 ${progress}%, #fff59a ${progress}%)`;
    });

    return () => {
      slider.removeEventListener('change');
    };
  }, [inputRef]);

  function handleChange(e) {
    const { target: { value } } = e;
    onChange(e, value);
  }

  return (
    <div className={cn(styles.container, className)}>
      <input
        ref={inputRef}
        type="range"
        className={cn(styles.slider)}
        onInput={handleChange}
        {...props}
      />

      <div className={styles.marks}>
        <span>{props.marks[0].label}</span>
        <span>{props.marks[1].label}</span>
      </div>
    </div>
  );
};
