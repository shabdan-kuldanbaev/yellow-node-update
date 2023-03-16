import React from 'react';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useCaseProps from './utils/useCaseProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const CaseStudyDesign = (props) => {
  const {
    type,
    content,
    sectionTitle,
    sectionDescription,
    style,
  } = useCaseProps(props);

  return (
    <section
      className={cn(styles[type], styles.container)}
      style={style}
    >
      <SectionTitle
        title={sectionTitle}
        description={sectionDescription}
        className={styles.titleStyle}
      />
      {content?.map(({
        title,
        description,
        imagesUrls,
        imgBundleUrls,
      }, i) => (
        <div
          key={`block-${i}`}
          className={cn(styles.block, styles[`block-${i + 1}`])}
        >
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <SectionTitle
              title={title}
              description={description}
              className={styles[`blockTitle-${i + 1}`]}
            />
          </Animated>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <div className={styles.imagesContainer}>
              {imagesUrls?.map(({ url }, y) => (
                <Illustration
                  src={url}
                  key={`image-${y + 1}`}
                  className={cn(styles[`image-${y + 1}`], styles.image)}
                  transparent
                />
              ))}
            </div>
            {imgBundleUrls?.map(({ url }, x) => (
              <Illustration
                src={url}
                key={`imageBundle-${x + 1}`}
                className={cn(styles[`imageBundle-${x + 1}`], styles.imageBundle)}
                transparent
              />
            ))}
          </Animated>
        </div>
      ))}
    </section>
  );
};

export default CaseStudyDesign;
