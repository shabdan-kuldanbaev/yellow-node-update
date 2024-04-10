import { useSelector } from 'react-redux';
import { selectIsMobile } from 'store/selectors/layout';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import { getDocumentFields } from 'utils/helper';
import { disabledSlider } from './helpers';

export const useChallengesAndSolutions = ({
  data,
  type,
  isSpecial,
  view,
}) => {
  const {
    type: componentType,
    contentModules,
    images,
  } = data;
  const isMobileResolution = useSelector(selectIsMobile);

  const isSlider = [CASE_STUDIES_TYPES.challengesSlider, CASE_STUDIES_TYPES.challengesSpecialSlider].includes(data.type);
  const isSliderDisabled = disabledSlider(type);

  const content = contentModules?.map((document) => {
    const {
      title,
      images: blockImages,
      text,
      imagesBundles,
      subtitle,
      contentList = [],
    } = getDocumentFields(document);

    return {
      title,
      text,
      subtitle,
      contentList,
      asset: blockImages?.[0] && blockImages[0],
      subImage: blockImages?.[1] && blockImages[1],
      imagesBundles,
    };
  });

  return {
    type,
    isSpecial,
    view,
    isSlider,
    isMobileResolution,
    content,
    componentType,
    images,
    isSliderDisabled,
  };
};
