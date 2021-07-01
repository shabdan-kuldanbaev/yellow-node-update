import {
  useRef,
  useState,
  useEffect,
} from 'react';
import { useIntersection } from 'react-use';

export const useIntersectionItem = () => {
  const [isIntersected, setIntersected] = useState(false);
  const intersectRef = useRef(null);
  const intersection = useIntersection(intersectRef, {
    root: null,
    rootMargin: '0px',
    threshold: 0.2,
  });

  useEffect(() => {
    if (intersectRef && intersectRef.current) {
      if (intersection && intersection.intersectionRatio >= 0.2) {
        setIntersected(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intersection]);

  return [intersectRef, isIntersected];
};
