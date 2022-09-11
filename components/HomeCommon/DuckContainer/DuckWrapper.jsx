import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { selectDuck } from 'redux/selectors/home';
import { fetchDuck } from 'redux/actions/home';
import LoadingScreen from 'components/Common/LoadingScreen';
import { mobileResolution } from 'utils/helper';
import { loadDuck, slogan } from './utils/threeHelper';

const Duck = dynamic(() => import('./Duck'), { ssr: false });

const DuckWrapper = ({ sloganRef }) => {
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

  return (
    <>
      {!duck && <LoadingScreen />}
      <Duck
        sloganRef={sloganRef}
        duck={duck}
      />
    </>
  );
};

export default DuckWrapper;
