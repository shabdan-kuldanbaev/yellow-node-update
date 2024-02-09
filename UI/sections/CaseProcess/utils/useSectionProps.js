import get from 'lodash/get';
import {
  getFileUrl,
  getImage,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { STEP_TITLE_ANIMATION, CARD_ANIMATION } from './animations';

export default ({ data, type }) => {
  const {
    title,
    subtitle,
    description,
    images: imagesData,
    contentModules,
    view,
  } = data;

  const images = imagesData?.map((module) => getImage(module));

  const steps = contentModules?.map(({ fields }) => {
    const {
      title: stepTitle,
      subtitle: stepSubtitle,
      contentList,
      text,
    } = fields;
    const imageBundles = fields.imagesBundles?.map((bundle) => getFileUrl(bundle));
    const image = fields.images?.[0];

    return {
      imageBundles,
      stepSubtitle,
      text,
      stepTitle,
      icon: contentList?.[0],
      image,
    };
  });

  const isTitleAnimated = STEP_TITLE_ANIMATION[type]?.[view];

  const isCardAnimated = CARD_ANIMATION[type]?.[view] || REVEAL_ANIMATION_PROPS;

  const backgroundUrl = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'webp' },
  );

  const style = backgroundUrl
    ? { backgroundImage: `url(${backgroundUrl})` }
    : {};

  return {
    type,
    style,
    title,
    subtitle,
    description,
    images,
    steps,
    view,
    isTitleAnimated,
    isCardAnimated,
  };
};
