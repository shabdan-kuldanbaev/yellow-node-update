import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const ChallengesAndSolutions = ({
  data,
  type,
  isSpecial,
  isMobileResolution,
  view,
}) => {
  if (!get(data, 'contentModules')) {
    return null;
  }

  return (
    <div className={cn(styles[type], styles[view])}>
      {data.contentModules.map((document) => {
        const {
          title,
          images,
          text,
          imagesBundles,
          contentList = [],
        } = getDocumentFields(document);
        const imageUrl = getOptimizedContentfulImage(
          getFileUrl(get(images, '[0]')),
          {
            height: isMobileResolution ? 500 : 812,
            fm: 'png',
            fl: 'png8',
          },
        );
        const subImageUrl = getOptimizedContentfulImage(
          getFileUrl(get(images, '[1]', '')),
          {
            height: 100,
            fm: 'png',
            fl: 'png8',
          },
        );

        return (
          <div
            key={title || imageUrl}
            className={cn(styles.contentContainer, { [styles.special]: isSpecial })}
          >
            {!imageUrl && (
              <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                <div className={cn(styles.infoContainer, styles.separatedTitle)}>
                  <h2 className={styles.title}>
                    {title}
                  </h2>
                </div>
              </Animated>
            )}
            <div className={cn(styles.infoContainer, { [styles.centrefy]: imageUrl })}>
              {subImageUrl && (
                <img
                  className={styles.subImage}
                  src={subImageUrl}
                  alt={title}
                />
              )}
              {imageUrl && (
                <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                  <h2 className={styles.title}>
                    {title}
                  </h2>
                </Animated>
              )}
              {text && (
                <Animated
                  delay={100}
                  {...ANIMATION_CASE_STUDY_PROPS}
                >
                  <ContentfulParser document={text} />
                </Animated>
              )}
              {!!contentList.length && (
                <ul className={styles.listContainer}>
                  {contentList.map((item, index) => (
                    <Animated
                      delay={100 + 10 * index}
                      {...ANIMATION_CASE_STUDY_PROPS}
                    >
                      <li className={styles.listItem}>
                        {item}
                      </li>
                    </Animated>
                  ))}
                </ul>
              )}
            </div>
            {imageUrl && (
              <Animated
                delay={500}
                {...ANIMATION_CASE_STUDY_PROPS}
              >
                <div>
                  <img
                    className={styles.image}
                    src={imageUrl}
                    alt={title}
                  />
                  {imagesBundles && imagesBundles.map((bundle) => {
                    const bundleUrl = getFileUrl(bundle);

                    return (
                      <img
                        className={styles.imageBundle}
                        src={bundleUrl}
                        alt={title}
                        key={`bundles-images/${bundleUrl}`}
                      />
                    );
                  })}
                </div>
              </Animated>
            )}
          </div>
        );
      })}
    </div>
  );
};

ChallengesAndSolutions.defaultProps = {
  type: '',
  isSpecial: false,
  view: '',
  isMobileResolution: false,
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  isSpecial: PropTypes.bool,
  isMobileResolution: PropTypes.bool,
  view: PropTypes.string,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(ChallengesAndSolutions);
