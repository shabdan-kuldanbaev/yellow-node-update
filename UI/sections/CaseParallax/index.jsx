import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Media from 'UI/components/Media';
import useParallaxProps from './utils/useParallaxProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CaseParallax = (props) => {
  const {
    type,
    view,
    sectionTitles,
    imagesBundles,
    contentList,
    className,
    parallaxProps,
  } = useParallaxProps(props);

  return (
    <section
      key={`${type}/${view}`}
      className={className}
    >
      <SectionTitle {...sectionTitles}>
        {!!contentList?.length
          && (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={50}
            >
              <ul className={styles.listContainer}>
                {contentList.map((item) => (
                  <li
                    key={item}
                    className={styles.listItem}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Animated>
          )}
      </SectionTitle>
      <div {...parallaxProps}>
        {imagesBundles?.map((image, index) => (
          <Media
            key={index}
            asset={image}
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
