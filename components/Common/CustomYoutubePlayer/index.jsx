import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from './styles.module.scss';

export const CustomYoutubePlayer = ({ src, className }) => (
  <div className={cn(styles.player, className)}>
    <iframe
      width="853"
      height="480"
      src={`https://www.youtube.com/embed/${src}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </div>
);

CustomYoutubePlayer.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
};
