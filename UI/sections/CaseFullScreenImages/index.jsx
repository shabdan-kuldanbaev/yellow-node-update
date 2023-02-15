import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { useCaseFullScreenImages } from './utils/useCaseFullScreenImages';
import styles from './styles.module.scss';

const CaseFullScreenImages = (props) => {
  const {
    view,
    type,
    title,
    subtitle,
    description,
    imageUrl,
  } = useCaseFullScreenImages(props);

  if (!imageUrl) {
    return null;
  }

  return (
    <section className={cn(styles[type], styles[view], styles.container)}>
      <SectionTitle
        type={type}
        title={title}
        subtitle={subtitle}
        description={description}
        className={styles.sectionTitle}
      />
      <img
        className={styles.image}
        src={imageUrl}
        alt={type}
      />
    </section>
  );
};

CaseFullScreenImages.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseFullScreenImages;
