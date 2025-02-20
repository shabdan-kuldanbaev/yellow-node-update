import {
  useRef,
  useState,
  useEffect,
} from 'react';
import { useIntersection } from 'react-use';

export const useIntersectionItem = (percentIntersection = 0.2) => {
  const [isIntersected, setIntersected] = useState(false);
  const intersectRef = useRef(null);
  const intersection = useIntersection(intersectRef, {
    root: null,
    rootMargin: '0px',
    threshold: percentIntersection,
  });

  useEffect(() => {
    if (intersectRef && intersectRef.current) {
      if (intersection && intersection.intersectionRatio >= percentIntersection) {
        setIntersected(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return [intersectRef, isIntersected];
};
