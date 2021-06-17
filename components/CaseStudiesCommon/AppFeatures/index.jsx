import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const AppFeatures = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const imageUrl = getFileUrl(get(data, 'images[0]', {}));

  const handleOnClick = (index) => () => {
    setActiveIndex(index);
  };

  if (!get(data, 'contentModules')) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        {data.contentModules.map((document, index) => {
          const { title, text } = getDocumentFields(document);

          return (
            <Animated
              key={title}
              delay={500 * index}
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
      <Animated {...ANIMATION_CASE_STUDY_PROPS}>
        <div>
          <img
            src={imageUrl}
            className={styles.image}
            alt={imageUrl}
          />
        </div>
      </Animated>
    </div>
  );
};

AppFeatures.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default AppFeatures;
