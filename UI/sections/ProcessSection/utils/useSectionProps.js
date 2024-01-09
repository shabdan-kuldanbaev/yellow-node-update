import get from 'lodash/get';
import { useEffect, useState } from 'react';
import { getDocumentFields, smallTabletResolution } from 'utils/helper';
import getCardRelations from './getCardRelations';

export default ({
  section,
  data,
  type,
  ...props
}) => {
  const [isSmallTabletResolution, setIsSmallTabletResolution] = useState(false);

  const {
    title,
    description,
    subtitle,
    contentModules,
    view,
  } = getDocumentFields(
    data || section,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
      'fields',
    ],
    { isNormilized: !!data },
  );

  const {
    contentModules: cardsList,
    subtitle: secondSubtitle,
    title: secondTitle,
  } = getDocumentFields(
    get(contentModules, '[0]', []),
    [
      'contentModules',
      'subtitle',
      'title',
    ],
  );

  const ctaLink = getDocumentFields(get(contentModules, '[1]', {}));

  const renderCards = cardsList?.map((card, index, array) => {
    const {
      title: typeTitle,
      contentList,
      text,
    } = getDocumentFields(card);
    const svgType = get(contentList, '[0]');
    const relations = getCardRelations(index, array, isSmallTabletResolution);

    return {
      svgType,
      relations,
      typeTitle,
      text,
      index,
    };
  });

  useEffect(() => {
    const handleOnResize = () => {
      setIsSmallTabletResolution(window.innerWidth <= smallTabletResolution);
    };

    handleOnResize();
    window.addEventListener('resize', handleOnResize);

    return () => window.removeEventListener('resize', handleOnResize);
  }, []);

  return {
    title,
    secondTitle,
    description,
    subtitle,
    secondSubtitle,
    cardsList,
    view,
    isSmallTabletResolution,
    renderCards,
    type,
    ctaLink,
    ...props,
  };
};
