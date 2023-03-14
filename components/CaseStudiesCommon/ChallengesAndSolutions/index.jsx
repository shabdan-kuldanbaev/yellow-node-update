import React from 'react';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import cn from 'classnames';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import ChallengesSlider from './ChallengesSlider';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const ChallengesAndSolutions = ({
  data,
  type,
  isSpecial,
  view,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  if (!get(data, 'contentModules')) {
    return null;
  }

  const isSlider = [CASE_STUDIES_TYPES.challengesSlider, CASE_STUDIES_TYPES.challengesSpecialSlider].includes(data.type);

  return (
    <div className={cn(styles[type], styles[view])}>
      <ChallengesSlider
        isMobileResolution={isMobileResolution}
        isSlider={isSlider}
        type={data.type}
      >
        {data.contentModules.map((document, index) => {
          const {
            title,
            images,
            text,
            imagesBundles,
            subtitle,
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
              {(!imageUrl && title) && (
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
                  <Illustration
                    layout="responsive"
                    className={styles.subImage}
                    src={subImageUrl}
                    alt={title}
                  />
                )}
                {imageUrl && subtitle && (
                  <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                    <div>
                      <p className={cn(styles.subtitle, styles[`subtitle-${index + 1}`])}>
                        {subtitle}
                      </p>
                    </div>
                  </Animated>
                )}
                {imageUrl && (
                  <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                    <div>
                      <h2 className={cn(styles.title, styles[`title-${index + 1}`])}>
                        {title}
                      </h2>
                    </div>
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
                    {contentList.map((item, contentIndex) => (
                      <Animated
                        delay={50 + 10 * contentIndex}
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
                <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                  <div className={styles.images}>
                    <Illustration
                      layout="responsive"
                      className={styles.image}
                      src={imageUrl}
                      alt={title}
                    />
                    {imagesBundles?.map((bundle, imagesBundlesIndex) => {
                      const bundleUrl = getFileUrl(bundle);

                      return (
                        <Illustration
                          layout="responsive"
                          className={cn(styles.imageBundle, styles[`imageBundle-${imagesBundlesIndex + 1}`])}
                          src={bundleUrl}
                          alt=""
                          key={`bundles-images/${bundleUrl}`}
                        />
                      );
                    })}
                  </div>
                </Animated>
              )}
              {!imageUrl && imagesBundles?.map((bundle, imagesBundlesIndex) => {
                const bundleUrl = getFileUrl(bundle);

                return (
                  <Illustration
                    layout="responsive"
                    className={cn(styles.imageBundle, styles[`imageBundle-${imagesBundlesIndex + 1}`])}
                    src={bundleUrl}
                    key={`bundles-images/${bundleUrl}`}
                    alt=""
                  />
                );
              })}
            </div>
          );
        })}
      </ChallengesSlider>
    </div>
  );
};

ChallengesAndSolutions.defaultProps = {
  type: '',
  isSpecial: false,
  view: '',
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  isSpecial: PropTypes.bool,
  view: PropTypes.string,
};

export default ChallengesAndSolutions;
