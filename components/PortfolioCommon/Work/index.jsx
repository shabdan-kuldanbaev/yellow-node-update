import cn from 'classnames';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import LinkWrapper from 'UI/components/LinkWrapper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Svg from 'UI/components/Svg';
import useProps from './utils/useProps';
import styles from './style.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Work = (props) => {
  const {
    link,
    revealDelay,
    slug,
    image,
    title,
    description,
  } = useProps(props);

  return (
    <LinkWrapper path={link.path}>
      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={revealDelay}
      >
        <div className={cn(styles.work, styles[slug])}>
          <Illustration
            src={image.url}
            alt={image.alt}
            className={styles.image}
          />
          <div className={styles.contentWrapper}>
            <div className={styles.titleWrapper}>
              <h2 className={styles.title}>
                {title}
              </h2>
              <Svg
                type="arrowRight"
                className={styles.arrow}
              />
            </div>
            <p className={styles.description}>
              {description}
            </p>
          </div>
        </div>
      </Animated>
    </LinkWrapper>
  );
};

Work.propTypes = {
  work: PropTypes.instanceOf(Object).isRequired,
  position: PropTypes.number,
};

export default Work;
