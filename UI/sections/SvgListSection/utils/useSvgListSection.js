import { useEffect, useMemo, useState } from 'react';
import { getDocumentFields } from 'utils/helper';

const getSvgSectionProps = (data) => {
  let link = null;
  const {
    title,
    description,
    contentModules,
    view,
  } = getDocumentFields(
    data,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  );
  const linkData = contentModules.find((modules) => modules.sys.contentType.sys.id === 'link');
  const iconsGroups = contentModules.filter((modules) => modules.sys.contentType.sys.id !== 'link');

  if (linkData) {
    const {
      title: linkTitle,
      buttonTitle,
      type,
    } = getDocumentFields(linkData);

    link = {
      linkTitle,
      buttonTitle,
      type,
    };
  }

  return {
    title,
    description,
    link,
    view,
    iconsGroups,
  };
};

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

  const displayNames = iconsGroups.map((group) => getDocumentFields(group, ['title']).title);

  const handleSelectedGroupIndexChange = (i) => setSelectedGroupIndex(i);

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
    handleSelectedGroupIndexChange,
    displayNames,
    selectedGroupIndex,
  };
};
