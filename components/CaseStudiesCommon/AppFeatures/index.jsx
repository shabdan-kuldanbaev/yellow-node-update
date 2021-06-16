import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const AppFeatures = ({ data }) => {
  const firstSection = getDocumentFields(get(data, 'contentModules[0]', {}));
  const firstTitle = get(firstSection, 'title', {});
  const [activeName, setActiveName] = useState(firstTitle);

  if (!firstTitle) {
    return null;
  }

  const handleOnClick = (name) => {
    setActiveName(name);
  };

  const imageUrl = getFileUrl(get(data, 'images[0]', {}));

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        {data.contentModules.map((document, index) => {
          const { title, text } = getDocumentFields(document);

          return (
            <Animated
              key={title}
              type={ANIMATED_TYPE.isFade}
              delay={500 * index}
              duration={1000}
            >
              <div
                className={cn(styles.sectionItem, {
                  [styles.sectionActiveItem]: title === activeName,
                })}
              >
                <p
                  className={styles.title}
                  onClick={() => handleOnClick(title)}
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
        type={ANIMATED_TYPE.isFade}
        duration={1000}
      >
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
