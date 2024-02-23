import { useMemo, useState } from 'react';
import { getDocumentFields } from 'utils/helper';

export default ({
  section,
  data,
  type,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnAccordionClick = (index) => () => {
    if (index === activeIndex) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  };

  const {
    title,
    description,
    contentModules,
    view,
  } = getDocumentFields(
    data || section,
    [
      'title',
      'description',
      'contentModules',
      'view',
    ],
  );

  const cardStackData = contentModules && useMemo(() => getDocumentFields(
    contentModules[activeIndex],
    ['contentModules'],
  ).contentModules?.map((cardData) => {
    const {
      avatar,
      bio,
      fullName,
      position,
      skills,
    } = getDocumentFields(cardData, [
      'avatar',
      'bio',
      'fullName',
      'position',
      'skills',
    ]);

    return {
      image: avatar,
      title: fullName,
      subtitle: position,
      description: bio,
      contentList: skills,
    };
  }), [
    activeIndex,
    contentModules,
  ]);

  return {
    type,
    view,
    title,
    description,
    cardStackData,
    contentModules,
    handleOnAccordionClick,
    activeIndex,
  };
};
