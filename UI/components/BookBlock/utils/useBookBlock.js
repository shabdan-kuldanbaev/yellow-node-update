import cn from 'classnames';
import {
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from '../styles.module.scss';

export const useBookBlock = (props) => {
  const {
    ctaProps,
    type,
    sectionRef,
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

    window.addEventListener('scroll', handleOnScroll);

    if (!editable) {
      window.removeEventListener('scroll', handleOnScroll);
    }

    if (blockShow) {
      setTimeout(() => {
        setButtonShow(true);
      }, 3000);
    }

    return () => {
      window.removeEventListener('scroll', handleOnScroll);
    };
  }, [
    sectionRef,
    editable,
    blockShow,
  ]);

  return {
    blockProps,
    ctaProps,
    setBlockShow,
    buttonShow,
    setButtonShow,
    handleClose,
  };
};
