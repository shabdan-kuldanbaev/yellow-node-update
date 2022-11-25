import {
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getDocumentFields } from 'utils/helper';
import { getSvgSectionProps } from './helpers';

export const useSvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
  withSelector,
}) => {
  const {
    title,
    description,
    link,
    view,
    iconsGroups,
  } = useMemo(() => getSvgSectionProps(sectionData), [sectionData]);

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const displayNames = useMemo(
    () => iconsGroups.map((group) => getDocumentFields(group, ['title']).title),
    [iconsGroups],
  );

  useEffect(() => {
    if (!withSelector) {
      return;
    }

    setSelectedGroupIndex(0);
  }, [withSelector]);

  return {
    title,
    description,
    link,
    view,
    iconsGroups,
    handleOnCTAClick,
    type,
    withSelector,
    displayNames,
    selectedGroupIndex,
    handleSelectedGroupIndexChange: setSelectedGroupIndex,
  };
};
