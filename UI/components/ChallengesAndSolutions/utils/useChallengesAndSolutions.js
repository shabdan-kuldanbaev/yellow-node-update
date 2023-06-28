import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'redux/selectors/layout';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import { getDocumentFields, getFileUrl, getImage } from 'utils/helper';

export const useChallengesAndSolutions = ({
  data,
  type,
  isSpecial,
  view,
}) => {
  const { type: componentType, contentModules } = data;
  const isMobileResolution = useSelector(selectIsMobile);

  const isSlider = [CASE_STUDIES_TYPES.challengesSlider, CASE_STUDIES_TYPES.challengesSpecialSlider].includes(data.type);

  const content = contentModules?.map((document) => {
    const {
      title,
      images,
      text,
      imagesBundles,
      subtitle,
      contentList = [],
    } = getDocumentFields(document);

    const image = getImage(get(images, '[0]'));
    const subImage = getImage(get(images, '[1]', ''));
    const imagesBundlesWithUrl = imagesBundles?.map((bundle) => getImage(bundle)) || [];

    return {
      title,
      text,
      subtitle,
      contentList,
      image,
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
  };
};
