import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectDuck } from 'redux/selectors/home';
import { fetchDuck } from 'redux/actions/home';
import { mobileResolution } from 'utils/helper';
import { slogan } from 'UI/components/Duck/utils/helpers';
import { loadDuck } from './helpers';

export const useDuckWrapper = ({ sloganRef }) => {
  const dispatch = useDispatch();
  const duck = useSelector(selectDuck);

  useEffect(() => {
    if (duck) {
      const isMobile = window.innerWidth < mobileResolution;

      slogan.animateSlogan(sloganRef);
      slogan.sloganOpacityAnimation(!isMobile ? 0.1 : 1);
    } else {
      dispatch(fetchDuck({
        isFirstHomepageVisit: true,
        loadDuck,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duck]);

  return {
    duck,
    sloganRef,
  };
};
