import get from 'lodash/get';
import cn from 'classnames';
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
  const isVideo = contentType === 'video/';
  const { url, alt } = getImage(asset);

  const imageProps = {
    alt,
    src: url,
    layout: 'fill',
    lazyBoundary: '700px',
    unoptimized: true,
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
    ...rest,
  };
};
