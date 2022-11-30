import Image from 'next/image';
import PropTypes from 'prop-types';
import useIllustration from './utils/useIllustration';

const Illustration = (props) => {
  const {
    className,
    style,
    ...restProps
  } = useIllustration(props);

  if (!restProps?.src) {
    return null;
  }

  return (
    <picture
      className={className}
      style={style}
    >
      <Image {...restProps} />
    </picture>
  );
};

Illustration.defaultProps = {
  layout: 'fill',
  placeholder: 'blur',
  alt: '',
  apiParams: {},
};

Illustration.propTypes = {
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
