import PropTypes from 'prop-types';
import cn from 'classnames';
import Illustration from 'UI/components/Illustration';
import { useBackgroundImages } from './utils/useBackgroundImages';
import styles from './styles.module.scss';

const BackgroundImages = (props) => {
  const {
    type,
    imagesWithUrl,
  } = useBackgroundImages(props);

  if (!imagesWithUrl) {
    return null;
  }

  return (
    <div className={cn(styles[type])}>
      {imagesWithUrl.map((imageUrl) => (
        <Illustration
          src={imageUrl}
          alt={imageUrl}
        />
      ))}
    </div>
  );
};

BackgroundImages.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default BackgroundImages;
