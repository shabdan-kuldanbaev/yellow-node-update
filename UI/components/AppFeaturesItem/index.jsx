import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { useAppFeaturesItem } from './utils/useAppFeaturesItem';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const AppFeaturesItem = (props) => {
  const {
    type,
    view,
    title,
    text,
    activeIndex,
    currentIndex,
    handleOnClick,
    imagesUrl,
  } = useAppFeaturesItem(props);

  return (
    <Animated
      key={title}
      delay={75 * currentIndex}
      {...REVEAL_ANIMATION_PROPS}
    >
      <div
        className={cn(
          styles.sectionItem,
          styles[type],
          styles[view],
          {
            [styles.sectionActiveItem]: currentIndex === activeIndex,
          },
        )}
      >
        <div
          role="presentation"
          className={styles.wrapperTitle}
          onClick={handleOnClick(currentIndex)}
        >
          <p className={styles.title}>
            {title}
          </p>
          {imagesUrl.map((imageUrl) => (
            <Illustration
              className={styles.imageBundle}
              src={imageUrl}
              alt=""
              key={`bundles-images/${imageUrl}`}
            />
          ))}
        </div>
        <Animated
          open={currentIndex === activeIndex}
          type={ANIMATED_TYPE.expandByHeight}
        >
          <div className={styles.description}>
            <ContentfulParser document={text} />
          </div>
        </Animated>
      </div>
    </Animated>
  );
};

AppFeaturesItem.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default AppFeaturesItem;
