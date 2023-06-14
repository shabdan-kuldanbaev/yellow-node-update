import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';

const Video = ({ src, className }) => {
  const ref = useRef(null);

  useEffect(() => {
    ref?.current?.play();
  });

  return (
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
};

Video.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

export default Video;
