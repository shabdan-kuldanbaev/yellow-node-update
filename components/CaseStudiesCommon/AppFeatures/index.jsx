import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const AppFeatures = ({ data, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnClick = (index) => () => {
    setActiveIndex(index);
  };

  const images = useMemo(() => {
    const imagesData = get(data, 'contentModules');

    return imagesData.map((module) => {
      const { images: moduleImages } = getDocumentFields(module);

      return getFileUrl(get(moduleImages, '[0]', {}));
    });
  }, [data]);

  if (!images?.length) {
    return null;
  }

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
                {...ANIMATION_CASE_STUDY_PROPS}
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
          {...ANIMATION_CASE_STUDY_PROPS}
        >
          <div className={styles.imageContainer}>
            {images.map((image, i) => (
              <Illustration
                layout="responsive"
                src={image}
                className={cn(styles.image, {
                  [styles.active]: i === activeIndex,
                })}
                alt={type}
              />
            ))}
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
