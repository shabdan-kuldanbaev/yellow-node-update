import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { setOverflowForBody } from 'utils/helper';
import CloseIcon from './images/close.svg';
import styles from './styles.module.scss';

export const ModalWindow = ({
  isModalWindow,
  closeModalWindow,
  children,
  className,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    setOverflowForBody(isModalWindow);
  }, [isModalWindow]);

  const handleOnClick = ({ target }) => {
    if (modalRef && modalRef.current) {
      if (modalRef.current.isEqualNode(target)) closeModalWindow();
    }
  };

  return (
    <section
      className={cn(styles.modalWindow, className, { [styles.show]: isModalWindow })}
      onClick={handleOnClick}
      ref={modalRef}
    >
      <img
        onClick={closeModalWindow}
        src={CloseIcon}
        alt="Cloce"
      />
      {children}
    </section>
  );
};

ModalWindow.propTypes = {
  isModalWindow: PropTypes.bool.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string.isRequired,
};
