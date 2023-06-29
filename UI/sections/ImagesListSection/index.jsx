import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const ImagesListSection = (props) => {
  const {
    title,
    description,
    imagesUrl,
    view,
    type,
    subtitle,
    secondTitle,
    secondSubtitle,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.imageSection, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          secondTitle={secondTitle}
          secondSubtitle={secondSubtitle}
          titleStyle={styles.titleStyle}
        />
        <div className={styles.imagesList}>
          {imagesUrl?.map((url, index) => (
            <Animated
              key={`images/${url}`}
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={50 * index}
            >
              <Illustration
                className={cn(styles.image, styles[`image-${index + 1}`])}
                src={url}
                alt={description}
              />
            </Animated>
          ))}
        </div>
      </div>
    </section>
  );
};

ImagesListSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesListSection;
