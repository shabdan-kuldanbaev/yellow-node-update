import { useEffect } from 'react';

export const useOverflowForBody = (isTrue) => {
  const setOverflowForBody = (value) => {
    document.body.style.overflow = value;
  };
  
  useEffect(() => {
    isTrue ? setOverflowForBody('hidden') : setOverflowForBody('scroll');
  }, [isTrue]);
};
