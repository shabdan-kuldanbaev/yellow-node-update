import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const AppFeatures = ({ data, type }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageUrl = getFileUrl(get(data, 'images[0]', ''));

  const handleOnClick = (index) => () => {
    setActiveIndex(index);
  };

  if (!get(data, 'contentModules')) {
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
                  <div className={styles.description}>
                    <ContentfulParser document={text} />
                  </div>
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
            <img
              src={imageUrl}
              // this class is defined in the caseStudyContainer mixin
              className={styles.image}
              alt={imageUrl}
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
