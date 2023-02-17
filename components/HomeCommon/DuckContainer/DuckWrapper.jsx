import React from 'react';
import dynamic from 'next/dynamic';
import LoadingScreen from 'UI/components/LoadingScreen';
import { useDuckWrapper } from './utils/useDuckWrapper';

const Duck = dynamic(() => import('./Duck'), { ssr: false });

const DuckWrapper = (props) => {
  const { duck, sloganRef } = useDuckWrapper(props);

  return (
    <>
      {/* <LoadingScreen /> */}
      {!duck && <LoadingScreen />}
      <Duck
        sloganRef={sloganRef}
        duck={duck}
      />
    </>
  );
};

export default DuckWrapper;
