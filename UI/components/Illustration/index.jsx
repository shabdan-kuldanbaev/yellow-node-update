import { memo } from 'react';
import Image from 'next/legacy/image';
import PropTypes from 'prop-types';
import cn from 'classnames';
import useIllustration from './utils/useIllustration';

const Illustration = memo((props) => {
  const {
    className,
    style,
    containerClasses,
    ...restProps
  } = useIllustration(props);

  if (!restProps?.src || (restProps.placeholder === 'blur' && !restProps.blurDataURL)) {
    return null;
  }

  return (
    <picture
      className={cn(className, containerClasses)}
      style={style}
    >
      <Image {...restProps} />
    </picture>
  );
});

Illustration.propTypes = {
  transparent: PropTypes.bool,
  // For more props check https://nextjs.org/docs/api-reference/next/legacy/image
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  layout: PropTypes.oneOf([
    'fill',
    'intrinsic',
    'fixed',
    'responsive',
  ]),
  placeholder: PropTypes.oneOf([
    'blur',
    'empty',
  ]),
  // Check https://www.contentful.com/developers/docs/references/images-api/ for detailed api
  apiParams: PropTypes.instanceOf(Object),
};

export default Illustration;
