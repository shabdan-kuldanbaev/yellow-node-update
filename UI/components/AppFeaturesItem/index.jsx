import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import Media from 'UI/components/Media';
import Svg from 'UI/components/Svg';
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
    imagesBundles,
    customIcon,
    className,
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
          className,
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
          {customIcon && (
            <Svg
              type={customIcon}
              className={styles.icon}
            />
          )}
          <p className={styles.title}>
            {title}
          </p>
          {imagesBundles?.map((imageUrl, index) => (
            <Media
              key={`media_key_${index}`}
              className={styles.imageBundle}
              asset={imageUrl}
            />
          ))}
          <Svg
            type="chevronDown"
            className={styles.expandIcon}
          />
        </div>
        <Animated
          open={currentIndex === activeIndex}
          type={ANIMATED_TYPE.expandByHeight}
        >
          <div className={cn(styles.description, { [styles.withIcon]: customIcon })}>
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
