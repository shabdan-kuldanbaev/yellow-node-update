import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import { getFileUrl } from 'utils/helper';
import SelectorElement from '../SelectorElement';
import { animatedProps } from '../utils';
import { SELECTOR_ELEMENT_TYPES } from '../SelectorElement/utils';
import styles from './style.module.scss';

const Work = ({
  work,
  customSlug,
  onTagClick,
  selectedTag,
}) => {
  const {
    title,
    description,
    tags,
    slug,
    mainImage,
    backgroundImage,
  } = work;

  return (
    <Animated
      {...animatedProps}
      transitionDelay={700}
    >
      <div className={cn(styles.work, styles[customSlug || slug])}>
        <div className={styles.images}>
          {backgroundImage && (
            <img
              src={getFileUrl(backgroundImage)}
              className={styles.backgroundImage}
              alt=""
            />
          )}
          {mainImage && (
            <img
              src={getFileUrl(mainImage)}
              className={styles.mainImage}
              alt="work preview"
            />
          )}
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.tagsWrapper}>
            {tags.map((tag) => (
              <SelectorElement
                key={tag.slug}
                displayName={tag.displayName}
                type={SELECTOR_ELEMENT_TYPES.tagDisplay}
                className={styles.tag}
                selected={selectedTag && tag.slug === selectedTag.slug}
                onClick={() => onTagClick(tag)}
              />
            ))}
          </div>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          {slug && (
            <ButtonMore
              title="View case"
              href={`works/${slug}`}
              buttonStyle={styles.buttonStyle}
            />
          )}
        </div>
      </div>
    </Animated>
  );
};

Work.defaultProps = {
  customSlug: null,
};

Work.propTypes = {
  work: PropTypes.instanceOf(Object).isRequired,
  customSlug: PropTypes.string,
  onTagClick: PropTypes.func.isRequired,
  selectedTag: PropTypes.instanceOf(Object).isRequired,
};

export default Work;
