import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import ChallengesSlider from 'UI/components/ChallengesSlider';
// import ChallengesSlider from 'components/CaseStudiesCommon/ChallengesAndSolutions/ChallengesSlider';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Illustration from 'UI/components/Illustration';
import Typography from 'UI/components/Typography';
import { useChallengesAndSolutions } from './utils/useChallengesAndSolutions';
import {
  PAGE_WITH_TRANSPERENT_IMAGE,
  PAGE_WITH_TRANSPERENT_IMAGE_BUNDLES,
} from './utils/helpers';
import styles from './styles.module.scss';

const ChallengesAndSolutions = (props) => {
  const {
    type,
    isSpecial,
    view,
    isSlider,
    isMobileResolution,
    content,
    componentType,
  } = useChallengesAndSolutions(props);

  if (!content) {
    return null;
  }

  return (
    <div className={cn(styles[type], styles[view])}>
      <ChallengesSlider
        isMobileResolution={isMobileResolution}
        isSlider={isSlider}
        componentType={componentType}
        type={type}
      >
        {content.map(({
          title,
          text,
          imagesBundles,
          subtitle,
          contentList,
          imageUrl,
          subImageUrl,
        }, index) => (
          <div
            key={title || imageUrl}
            className={cn(styles.contentContainer, { [styles.special]: isSpecial })}
          >
            {(!imageUrl && title) && (
              <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                <div className={cn(styles.infoContainer, styles.separatedTitle)}>
                  <Typography
                    variant="h2"
                    className={styles.title}
                  >
                    {title}
                  </Typography>
                </div>
              </Animated>
            )}
            <div className={cn(styles.infoContainer, { [styles.centrefy]: imageUrl })}>
              {subImageUrl && (
                <Illustration
                  transparent={PAGE_WITH_TRANSPERENT_IMAGE.includes(type)}
                  className={styles.subImage}
                  src={subImageUrl}
                  alt={title}
                />
              )}
              {imageUrl && subtitle && (
                <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                  <div>
                    <Typography
                      variant="p"
                      className={cn(styles.subtitle, styles[`subtitle-${index + 1}`])}
                    >
                      {subtitle}
                    </Typography>
                  </div>
                </Animated>
              )}
              {imageUrl && (
                <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                  <div>
                    <Typography
                      variant="h2"
                      className={cn(styles.title, styles[`title-${index + 1}`])}
                    >
                      {title}
                    </Typography>
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
                    transparent={PAGE_WITH_TRANSPERENT_IMAGE.includes(type)}
                    className={styles.image}
                    src={imageUrl}
                    alt={title}
                  />
                  {imagesBundles.map((bundleUrl, imagesBundlesIndex) => (
                    <Illustration
                      transparent={PAGE_WITH_TRANSPERENT_IMAGE_BUNDLES.includes(type)}
                      className={cn(styles.imageBundle, styles[`imageBundle-${imagesBundlesIndex + 1}`])}
                      src={bundleUrl}
                      alt=""
                      key={`bundles-images/${bundleUrl}`}
                    />
                  ))}
                </div>
              </Animated>
            )}
            {!imageUrl && imagesBundles.map((bundleUrl, imagesBundlesIndex) => (
              <Illustration
                transparent={PAGE_WITH_TRANSPERENT_IMAGE_BUNDLES.includes(type)}
                className={cn(styles.imageBundle, styles[`imageBundle-${imagesBundlesIndex + 1}`])}
                src={bundleUrl}
                key={`bundles-images/${bundleUrl}`}
                alt=""
              />
            ))}
          </div>
        ))}
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
