import React from 'react';
import cn from 'classnames';
import { Animated } from 'components/Common/Animated';
import ButtonMore from 'components/Common/ButtonMore';
import { getFileUrl } from 'utils/helper';
import SelectorElement from '../SelectorElement';
import { animatedProps } from '../utils';
import { SELECTOR_ELEMENT_TYPES } from '../SelectorElement/utils';
import styles from './style.module.scss';

const Work = ({ work, customSlug }) => {
  const {
    title,
    description,
    tags,
    slug,
    previewImage,
  } = work;

  return (
    <Animated
      {...animatedProps}
      transitionDelay={700}
    >
      <div className={cn(styles.work, styles[customSlug || slug])}>
        <img
          src={getFileUrl(previewImage)}
          className={styles.image}
          alt="work preview"
        />
        <div className={styles.contentWrapper}>
          <div className={styles.tagsWrapper}>
            {tags.map((tag) => (
              <SelectorElement
                displayName={tag.displayName}
                type={SELECTOR_ELEMENT_TYPES.tagDisplay}
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

export default Work;
