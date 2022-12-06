import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const ImagesListSection = (props) => {
  const {
    title,
    description,
    imagesUrl,
    view,
    type,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.imageSection, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          description={description}
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
                className={styles.image}
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
