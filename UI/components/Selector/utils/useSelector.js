import { useCallback } from 'react';
import { getSwiperParams } from './helpers';

export const useSelector = ({
  type,
  displayNames,
  selectedIndex,
  onSelectedIndexChange,
}) => {
  const handleSelectedIndexChange = useCallback(
    (i) => () => onSelectedIndexChange(i),
    [],
  );

  const swiperParams = getSwiperParams(type);

  return {
    swiperParams,
    displayNames,
    selectedIndex,
    handleSelectedIndexChange,
  };
};
