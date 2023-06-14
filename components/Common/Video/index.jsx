import PropTypes from 'prop-types';

const Video = ({
  ref,
  src,
  className,
  ...rest
}) => (
  <video
    ref={ref}
    autoPlay
    loop
    muted
    className={className}
    playsInline
  >
    <source
      src={src}
      type="video/mp4"
    />
  </video>
);

Video.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Video;
