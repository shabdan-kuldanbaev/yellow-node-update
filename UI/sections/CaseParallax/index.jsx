import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useParallaxProps from './utils/useParallaxProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CaseParallax = (props) => {
  const {
    title,
    subtitle,
    description,
    imageUrl,
    bundleImages,
    contentList,
    className,
  } = useParallaxProps(props);

  return (
    <section className={className}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        titleStyle={styles.titleStyle}
      >
        {!!contentList.length
          && (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={50}
            >
              <ul className={styles.listContainer}>
                {contentList.map((item) => (
                  <li className={styles.listItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </Animated>
          )}
      </SectionTitle>
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={styles.parallaxImage}
      >
        {bundleImages?.map((src, index) => (
          <Illustration
            primary
            unoptimized
            transparent
            src={src}
            className={cn(styles.bundleImage, styles[`bundleImage-${index + 1}`])}
          />
        ))}
      </div>
    </section>
  );
};

CaseParallax.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseParallax;
