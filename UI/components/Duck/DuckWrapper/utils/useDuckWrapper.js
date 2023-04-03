import { useContext, useEffect } from 'react';
import { slogan } from 'UI/components/Duck/utils/helpers';
import { AppContext } from 'utils/appContext';
import { mobileResolution } from 'utils/helper';

export const useDuckWrapper = ({ sloganRef }) => {
  const { contextData: { duck } } = useContext(AppContext);

  useEffect(() => {
    if (!duck) {
      return;
    }

    const isMobile = window.innerWidth < mobileResolution;

    slogan.animateSlogan(sloganRef);
    slogan.sloganOpacityAnimation(!isMobile ? 0.1 : 1);
  }, [duck, sloganRef]);

  return {
    duck,
    sloganRef,
  };
};
