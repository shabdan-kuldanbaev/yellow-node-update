import cn from 'classnames';
import PropTypes from 'prop-types';
import { to, animated } from 'react-spring';
import Svg from 'UI/components/Svg';
import Media from 'UI/components/Media';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import useComponentProps from './utils/useComponentProps';
import styles from './styles.module.scss';

const CardStack = (props) => {
  const {
    slug,
    view,
    data,
    currentIndex,
    springs,
    handleOnNextClick,
    handleOnPrevClick,
    isMobile,
  } = useComponentProps(props);

  return (
    data?.length > 0 && (
      <div className={cn(styles.container, styles[slug], styles[view])}>
        <div className={styles.cardStack}>
          {springs?.map(({ x, scale, zIndex }, index) => (
            <animated.div
              key={index}
              className={cn(styles.card, { [styles.isMobile]: isMobile })}
              style={{
                zIndex,
                transform: to(
                  [x, scale],
                  (toX, toScale) => `translateX(${toX}px) scale(${toScale})`,
                ),
              }}
            >
              {data[index].image && (
                <Media
                  asset={data[currentIndex].image}
                  className={styles.cardImage}
                />
              )}
              <div className={styles.cardHeader}>
                {data[index].title && (
                  <h4 className={styles.cardTitle}>
                    {data[index].title}
                  </h4>
                )}
                {data[index].subtitle && (
                  <h5 className={styles.cardSubtitle}>
                    {data[index].subtitle}
                  </h5>
                )}
              </div>
              <div className={styles.cardContent}>
                {data[index].description && (
                  <p className={styles.cardDescription}>
                    {data[index].description}
                  </p>
                )}
                {data[index].contentList && (
                  <div className={styles.contentList}>
                    {data[index].contentList.map((item) => (
                      <span
                        key={item}
                        className={styles.contentItem}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className={cn(styles.controls, { [styles.isMobile]: isMobile })}>
                <span>
                  {currentIndex + 1}
                  /
                  {data.length}
                </span>
                <button
                  type="button"
                  className={styles.control}
                  onClick={() => handleOnPrevClick()}
                  disabled={currentIndex === 0}
                >
                  <Svg type={SVG_IMAGES_TYPES.arrowLeft} />
                </button>
                <button
                  type="button"
                  className={styles.control}
                  onClick={() => handleOnNextClick()}
                  disabled={currentIndex === data.length - 1}
                >
                  <Svg type={SVG_IMAGES_TYPES.arrowRight} />
                </button>
              </div>
            </animated.div>
          ))}
        </div>
        <div className={cn(styles.navigationContainer, { [styles.isMobile]: isMobile })}>
          <button
            type="button"
            className={styles.navigationButton}
            onClick={() => handleOnPrevClick()}
            disabled={currentIndex === 0}
          >
            <Svg type={SVG_IMAGES_TYPES.arrowLeft} />
            previous
          </button>
          <button
            type="button"
            className={styles.navigationButton}
            onClick={() => handleOnNextClick()}
            disabled={currentIndex === data.length - 1}
          >
            next
            <Svg type={SVG_IMAGES_TYPES.arrowRight} />
          </button>
        </div>
      </div>
    )
  );
};

CardStack.propTypes = {
  data: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  slug: PropTypes.string,
  view: PropTypes.string,
};

export default CardStack;
