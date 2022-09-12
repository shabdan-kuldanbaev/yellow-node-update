import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const AppFeatures = ({ data, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imagesData = get(data, 'contentModules');

  const handleOnClick = (index) => () => {
    setActiveIndex(index);
  };

  if (!imagesData) {
    return null;
  }

  const images = imagesData.map((module) => {
    const { images: moduleImages } = getDocumentFields(module);

    return getFileUrl(get(moduleImages, '[0]', {}));
  });

  return (
    <section className={styles[type]}>
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.container}>
        <div className={styles.sectionContainer}>
          {data.contentModules.map((document, index) => {
            const { title, text } = getDocumentFields(document);

            return (
              <Animated
                key={title}
                delay={75 * index}
                {...REVEAL_ANIMATION_PROPS}
              >
                <div
                  className={cn(styles.sectionItem, {
                    [styles.sectionActiveItem]: index === activeIndex,
                  })}
                >
                  <p
                    className={styles.title}
                    onClick={handleOnClick(index)}
                  >
                    {title}
                  </p>
                  <Animated
                    open={index === activeIndex}
                    type={ANIMATED_TYPE.expandByHeight}
                  >
                    <div className={styles.description}>
                      <ContentfulParser document={text} />
                    </div>
                  </Animated>
                </div>
              </Animated>
            );
          })}
        </div>
        <Animated
          delay={500}
        >
          <div className={styles.imageContainer}>
            <img
              src={images[activeIndex]}
              className={styles.image}
              alt={type}
            />
          </div>
        </Animated>
      </div>
    </section>
  );
};

AppFeatures.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default AppFeatures;
