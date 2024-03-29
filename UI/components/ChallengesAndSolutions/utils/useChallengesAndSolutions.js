import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'store/selectors/layout';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import { getDocumentFields, getImage } from 'utils/helper';
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
    images: rawImages,
  } = data;
  const isMobileResolution = useSelector(selectIsMobile);

  const isSlider = [CASE_STUDIES_TYPES.challengesSlider, CASE_STUDIES_TYPES.challengesSpecialSlider].includes(data.type);
  const isSliderDisabled = disabledSlider(type);

  const images = (rawImages || []).map((rawImage) => getImage(rawImage));

  const content = contentModules?.map((document) => {
    const {
      title,
      images: blockImages,
      text,
      imagesBundles,
      subtitle,
      contentList = [],
    } = getDocumentFields(document);
    const subImage = getImage(get(blockImages, '[1]', ''));
    const imagesBundlesWithUrl = imagesBundles?.map((bundle) => getImage(bundle)) || [];

    return {
      title,
      text,
      subtitle,
      contentList,
      asset: !!blockImages?.[0] && blockImages[0],
      subImage,
      imagesBundles: imagesBundlesWithUrl,
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
