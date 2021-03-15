import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { setOverflowForBody, getPathWithCdn } from 'utils/helper';
import { CloseIcon } from './utils/data';
import styles from './styles.module.scss';

export const ModalWindow = ({
  isModalWindow,
  closeModalWindow,
  children,
  className,
}) => {
  const modalRef = useRef(null);

  const handleOnClick = ({ target }) => {
    if (modalRef && modalRef.current) {
      if (modalRef.current.isEqualNode(target)) closeModalWindow();
    }
  };

  useEffect(() => {
    setOverflowForBody(isModalWindow);
  }, [isModalWindow]);

  useEffect(() => {
    const handleOnKeyDown = ({ key }) => {
      if (key === 'Escape') {
        closeModalWindow();
      }
    };

    document.addEventListener('keydown', handleOnKeyDown);

    return () => document.removeEventListener('keydown', handleOnKeyDown);
  }, []);

  return (
    <section
      className={cn(styles.modalWindow, className, { [styles.show]: isModalWindow })}
      onClick={handleOnClick}
      ref={modalRef}
    >
      <img
        onClick={closeModalWindow}
        src={getPathWithCdn(CloseIcon)}
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
