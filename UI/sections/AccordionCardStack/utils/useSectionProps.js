import { useState } from 'react';
import { getDocumentFields } from 'utils/helper';

export default ({
  section,
  data,
  type,
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

  const {
    contentModules: cardContentModules,
  } = getDocumentFields(
    contentModules[1],
    ['contentModules'],
  );

  const {
    contentModules: accordionContentModules,
  } = getDocumentFields(
    contentModules[0],
    ['contentModules'],
  );

  const cardStackData = cardContentModules?.map((cardData) => {
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
  });

  return {
    type,
    view,
    title,
    description,
    cardStackData,
    accordionContentModules,
    handleOnAccordionClick,
    activeIndex,
  };
};
