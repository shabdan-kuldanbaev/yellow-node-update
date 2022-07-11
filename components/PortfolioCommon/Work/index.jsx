import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Animated from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import CustomImage from 'components/Common/CustomImage';
import SelectorElement from 'components/PortfolioCommon/SelectorElement';
import { getFileUrl } from 'utils/helper';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { SELECTOR_ELEMENT_TYPES } from 'components/PortfolioCommon/SelectorElement/utils';
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

  const handleTagClick = (tag) => () => onTagClick(tag);

  return (
    <Animated
      {...REVEAL_ANIMATION_PROPS}
      transitionDelay={700}
    >
      <div className={cn(styles.work, styles[customSlug || slug])}>
        {backgroundImage && (
          <CustomImage
            src={getFileUrl(backgroundImage)}
            layout="fill"
            width={700}
            height={700}
            scale={2}
            containerClasses={styles.imageContainer}
            className={styles.backgroundImage}
          />
        )}
        {mainImage && (
          <CustomImage
            src={getFileUrl(mainImage)}
            alt="work preview"
            layout="responsive"
            width={700}
            height={700}
            scale={2}
            containerClasses={styles.imageContainer}
            className={styles.mainImage}
          />
        )}
        <div className={styles.contentWrapper}>
          <div className={styles.tagsWrapper}>
            {tags.map((tag) => (
              <SelectorElement
                key={tag.slug}
                displayName={tag.displayName}
                type={SELECTOR_ELEMENT_TYPES.tagDisplay}
                className={styles.tag}
                selected={selectedTag && tag.slug === selectedTag.slug}
                onClick={handleTagClick(tag)}
              />
            ))}
          </div>
          <h2 className={styles.title}>
            {title}
          </h2>
          <p className={styles.description}>
            {description}
          </p>
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
  selectedTag: null,
};

Work.propTypes = {
  work: PropTypes.instanceOf(Object).isRequired,
  customSlug: PropTypes.string,
  onTagClick: PropTypes.func.isRequired,
  selectedTag: PropTypes.instanceOf(Object),
};

export default Work;
