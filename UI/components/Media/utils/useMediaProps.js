import get from 'lodash/get';
import { getContentfulImage } from 'UI/components/Illustration/utils/helpers';
import { getImage } from 'utils/helper';

export default ({
  asset,
  className,
  isStatic,
  transparent,
  loaderParams,
  ...rest
}) => {
  const { file: { contentType } } = get(asset, 'fields', {});
  const isVideo = contentType === 'video/mp4';
  const { url, alt } = getImage(asset);

  const imageProps = {
    alt,
    src: url,
    layout: 'fill',
    loader: isStatic
      ? ({ src }) => src
      : (args) => getContentfulImage({ transparent, ...args, ...loaderParams }),
    ...rest,
  };

  return {
    url,
    isVideo,
    className,
    imageProps,
  };
};
