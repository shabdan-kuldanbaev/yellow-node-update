import { useState } from 'react';

export const useSoftwarePriceForm = ({ title, list, data }) => {
  const { first, second } = data;

  const [firstValue, setFirstValue] = useState(null);
  const [secondValue, setSecondValue] = useState(null);
  const [isFullscreenEstimationOpen, setIsFullscreenEstimationOpen] = useState(false);

  const openFullscreenEstimation = () => {
    setIsFullscreenEstimationOpen(true);
  };

  const closeFullscreenEstimation = () => {
    setIsFullscreenEstimationOpen(false);
  };

  const descriptionValue = `${first.placeholder} ${firstValue}; ${second.placeholder} ${secondValue}`;

  return {
    title,
    list,
    first,
    second,
    firstValue,
    secondValue,
    setFirstValue,
    setSecondValue,
    descriptionValue,
    isFullscreenEstimationOpen,
    openFullscreenEstimation,
    closeFullscreenEstimation,
  };
};
