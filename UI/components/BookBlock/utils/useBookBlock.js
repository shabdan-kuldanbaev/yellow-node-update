import cn from 'classnames';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '../styles.module.scss';

export const useBookBlock = (props) => {
  const {
    type,
    sectionRef,
    ...rest
  } = props;

  const blockRef = useRef(null);

  const [editable, setEditable] = useState(true);
  const [blockShow, setBlockShow] = useState(false);
  const [buttonShow, setButtonShow] = useState(false);

  const handleClose = () => {
    setBlockShow(false);
    setEditable(false);
  };

  const className = cn(styles.bookBlock, styles[type], {
    [styles.blockShow]: blockShow,
  });

  const blockProps = {
    ref: blockRef,
    className,
  };

  useEffect(() => {
    // const bookBlockTimer = setTimeout(() => {
    //   setBlockShow(true);
    // }, 5000);

    const handleOnScroll = () => {
      const positionY = window.scrollY;

      if (editable && sectionRef.current) {
        const section = sectionRef.current.getBoundingClientRect();

        if ((section.height / 2) < positionY) {
          setBlockShow(true);
        } else {
          setBlockShow(false);
        }
      }
    };

    setTimeout(() => {
      setBlockShow(true);
    }, 5000);

    // bookBlockTimer();

    window.addEventListener('scroll', handleOnScroll);

    if (!editable) {
      window.removeEventListener('scroll', handleOnScroll);
    }

    if (blockShow) {
      // const bookButtonTimer = setTimeout(() => {
      //   setButtonShow(true);
      // }, 3000);

      setTimeout(() => {
        setButtonShow(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('scroll', handleOnScroll);

      // clearTimeout(bookBlockTimer);
      // clearTimeout(bookButtonTimer);
    };
  }, [
    sectionRef,
    editable,
    blockShow,
  ]);

  return {
    blockProps,
    buttonShow,
    handleClose,
    ...rest,
  };
};
