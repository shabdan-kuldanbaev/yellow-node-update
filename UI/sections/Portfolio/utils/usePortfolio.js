import {
  useState,
  useRef,
  useEffect,
  createRef,
  useCallback,
} from 'react';
import throttle from 'lodash/throttle';
import { getDocumentFields } from 'utils/helper';
import { blockNumbers } from './data';
import styles from '../styles.module.scss';

export const usePortfolio = ({ sectionData = {} }) => {
  const {
    title,
    description,
    contentModules,
  } = getDocumentFields(sectionData);
  const [currentPosition, setCurrentPosition] = useState(0);

  const portfolioRef = useRef(null);
  const refs = useRef(contentModules.map(() => createRef()));

  const handleOnScroll = useCallback(() => {
    const isWorksRefsExist = refs.current.reduce((acc, ref) => acc && ref.current, true);

    if (!isWorksRefsExist) {
      return;
    }

    const halfHeight = window.innerHeight / 2;

    const [
      firstTop,
      secondTop,
      thirdTop,
    ] = refs.current.map((ref) => ref.current.getBoundingClientRect().top);

    if (firstTop > halfHeight && currentPosition) {
      return setCurrentPosition(0);
    }

    if (firstTop < halfHeight && secondTop > halfHeight) {
      return setCurrentPosition(1);
    }

    if (secondTop < halfHeight && thirdTop > halfHeight) {
      return setCurrentPosition(2);
    }

    if (thirdTop - halfHeight < 10) {
      return setCurrentPosition(3);
    }
  }, [currentPosition]);

  useEffect(() => {
    portfolioRef.current.classList.remove(styles[blockNumbers[currentPosition + 1]]);

    portfolioRef.current.classList.add(styles[blockNumbers[currentPosition]]);
  }, [currentPosition]);

  useEffect(() => {
    handleOnScroll();

    window.addEventListener('scroll', throttle(handleOnScroll, 100));

    return () => window.removeEventListener('scroll', handleOnScroll);
  }, [handleOnScroll]);

  return {
    refs,
    title,
    description,
    portfolioRef,
    contentModules,
  };
};
