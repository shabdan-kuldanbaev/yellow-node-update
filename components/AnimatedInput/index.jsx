import React, { useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import cn from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const AnimatedInput = ({
  value,
  handleOnChange,
  placeholder,
}) => {
  const inputRef = useRef();
  const [isInputActived, setActive] = useState(false);
  const animatedInput = cn({
    [`${styles.animatedInput}`]: true,
    [`${styles.active}`]: isInputActived,
  });

  const handleOnClick = () => {
    inputRef.current.focus();
    setActive(true);
  };

  return (
    <OutsideClickHandler onOutsideClick={() => setActive(false)}>
      <div className={animatedInput} onClick={handleOnClick}>
        <label htmlFor={value}>{placeholder}</label>
        <input
          ref={inputRef}
          type="text"
          id={value}
          value={value}
          onChange={handleOnChange}
        />
      </div>
    </OutsideClickHandler>
  );
};

AnimatedInput.propTypes = {
  value: PropTypes.string.isRequired,
  handleOnChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default AnimatedInput;
