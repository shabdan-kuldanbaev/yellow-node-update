import React from 'react';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Illustration from 'UI/components/Illustration';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Animated from 'UI/containers/Animated';
import useCaseProps from './utils/useCaseProps';
import styles from './styles.module.scss';

const CaseStudyDesign = (props) => {
  const {
    type,
    content,
  } = useCaseProps(props);

  return (
    <section className={cn(styles[type], styles.container)}>
      {content?.map(({
        title,
        description,
        imagesUrls,
      }, i) => (
        <div
          key={`block-${i}`}
          className={cn(styles.block, styles[`block-${i + 1}`])}
        >
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <SectionTitle
              title={title}
              description={description}
            />
          </Animated>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <div className={styles.imagesContainer}>
              {imagesUrls?.map(({ url }, y) => (
                <Illustration
                  src={url}
                  key={`image-${y + 1}`}
                  className={styles[`image-${y + 1}`]}
                  transparent
                />
              ))}
            </div>
          </Animated>
        </div>
      ))}
    </section>
  );
};

export default CaseStudyDesign;
