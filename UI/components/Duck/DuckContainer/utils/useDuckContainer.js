'use client';

import { useRef } from 'react';

export const useDuckContainer = () => {
  const containerText = useRef(null);
  const sloganRef = useRef(null);

  return {
    sloganRef,
    containerText,
  };
};
