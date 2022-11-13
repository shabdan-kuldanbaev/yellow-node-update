import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getFileUrl } from 'utils/helper';
import { REVEAL_ANIMATION_PROPS } from '../../../utils/constants';
import useSectionProps from './useSectionProps';
import styles from './styles.module.scss';

const ImagesListSection = ({
  sectionData,
  type,
}) => {
  const {
    title,
    description,
    images,
    view,
  } = useSectionProps(sectionData);

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      <div className={styles.imagesList}>
        {images && images.map((image, imageIndex) => {
          const imageUrl = getFileUrl(image);

          return (
            <Animated
              key={`images/${imageUrl}`}
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={300 + 50 * imageIndex}
            >
              <img
                className={styles.image}
                src={imageUrl}
                alt=""
              />
            </Animated>
          );
        })}
      </div>
    </section>
  );
};

ImagesListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesListSection;
