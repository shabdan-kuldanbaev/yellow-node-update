import PropTypes from 'prop-types';

const Video = ({ src, className }) => (
  <video
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
