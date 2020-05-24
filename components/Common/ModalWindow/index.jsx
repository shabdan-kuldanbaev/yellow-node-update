import React, { useEffect } from 'react';
import cn from 'classnames';
import { setOverflowForBody } from 'utils/helper';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';
import CloseIcon from './images/close.svg';

export const ModalWindow = ({
  isModalWindow,
  closeModalWindow,
  children,
  className,
}) => {
  useEffect(() => {
    setOverflowForBody(isModalWindow);
  }, [isModalWindow]);

  return (
    <section className={cn(styles.modalWindow, className, { [styles.show]: isModalWindow })}>
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
