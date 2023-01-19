import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const ImageSection = (props) => {
  const {
    title,
    description,
    text,
    imageUrl,
    type,
    view,
  } = useSectionProps(props);

  if (!imageUrl || !text) return null;

  return (
    <section className={cn(styles[type], styles[view])}>
      <div className={styles.imageSection}>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </Animated>
        <div className={styles.experienceContent}>
          <SectionTitle
            title={title}
            description={description}
            type="side"
            titleStyle={styles.titleStyle}
          />
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <ContentfulParser document={text} />
          </Animated>
        </div>
      </div>
    </section>
  );
};

ImageSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImageSection;
