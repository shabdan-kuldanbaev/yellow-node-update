import { useMemo } from 'react';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';

export const useChallengesAndSolutions = ({
  data,
  type,
  isSpecial,
  view,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  const isSlider = [CASE_STUDIES_TYPES.challengesSlider, CASE_STUDIES_TYPES.challengesSpecialSlider].includes(data.type);

  const content = useMemo(() => data.contentModules?.map((document) => {
    const {
      title,
      images,
      text,
      imagesBundles,
      subtitle,
      contentList = [],
    } = getDocumentFields(document);

    const imageUrl = getOptimizedContentfulImage(
      getFileUrl(get(images, '[0]')),
      {
        height: isMobileResolution ? 500 : 812,
        fm: 'png',
        fl: 'png8',
      },
    );

    const subImageUrl = getOptimizedContentfulImage(
      getFileUrl(get(images, '[1]', '')),
      {
        height: 100,
        fm: 'png',
        fl: 'png8',
      },
    );

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
  }), [data.contentModules, isMobileResolution]);

  return {
    data,
    type,
    isSpecial,
    view,
    isSlider,
    isMobileResolution,
    content,
  };
};
