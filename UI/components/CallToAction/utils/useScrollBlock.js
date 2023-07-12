import { useEffect, useState } from 'react';
import cn from 'classnames';
import downloadFile from 'utils/downloadFile';
import useToggle from 'hooks/useToggle';
import styles from '../styles/scrollBlock.module.scss';

export default (props) => {
  const {
    page,
    sectionRef,
    isSubscribed,
    downloadLink,
    ...rest
  } = props;
  const [scroll, setScroll] = useState(true);
  const [buttonShow, setButtonShow] = useState(false);
  const [show, setShow] = useState(false);

  const [isGetBookShown, toggleGetBookModalShown] = useToggle(false);

  const handleOnClick = () => {
    if (isSubscribed) {
      return downloadFile(downloadLink);
    }

    toggleGetBookModalShown(true);
  };

  const handleClose = () => {
    setScroll(false);
    setShow(false);
  };

  const className = cn(styles.block, styles[page], {
    [styles.blockShow]: show,
  });

  useEffect(() => {
    let buttonTimer;
    let showTimer;

    const handleOnScroll = () => {
      clearTimeout(showTimer);

      const positionY = window.scrollY;

      if (sectionRef.current) {
        const section = sectionRef.current.getBoundingClientRect();

        if ((section.height / 2) < positionY) {
          setShow(true);
        }
      }
    };

    if (scroll) {
      showTimer = setTimeout(() => {
        setShow(true);
      }, 5000);
    }

    if (show) {
      clearTimeout(showTimer);

      buttonTimer = setTimeout(() => {
        setButtonShow(true);
      }, 3000);
    }

    window.addEventListener('scroll', handleOnScroll);

    if (!scroll) {
      window.removeEventListener('scroll', handleOnScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleOnScroll);

      clearTimeout(buttonTimer);
    };
  }, [
    show,
    scroll,
    sectionRef,
  ]);

  return {
    show,
    buttonShow,
    handleClose,
    className,
    handleOnClick,
    isGetBookShown,
    toggleGetBookModalShown,
    ...rest,
  };
};
