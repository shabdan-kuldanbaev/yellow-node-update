import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobile } from 'redux/selectors/layout';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import { getDocumentFields, getFileUrl } from 'utils/helper';

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

    const imageUrl = getFileUrl(get(images, '[0]'));
    const subImageUrl = getFileUrl(get(images, '[1]', ''));
    const imagesBundlesWithUrl = imagesBundles?.map((bundle) => getFileUrl(bundle)) || [];

    return {
      title,
      text,
      subtitle,
      contentList,
      imageUrl,
      subImageUrl,
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
