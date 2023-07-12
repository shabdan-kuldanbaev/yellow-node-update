import React from 'react';
import useScrollWrapper from './utils/useScrollWrapper';

const ScrollWrapper = (props) => {
  const {
    ...rest
  } = useScrollWrapper(props);

  return (
    <div>index</div>
  );
};

export default ScrollWrapper;
