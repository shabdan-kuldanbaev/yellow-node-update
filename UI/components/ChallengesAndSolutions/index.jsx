import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import ChallengesSlider from 'UI/components/ChallengesSlider';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Typography from 'UI/components/Typography';
import Media from 'UI/components/Media';
import { useChallengesAndSolutions } from './utils/useChallengesAndSolutions';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const ChallengesAndSolutions = (props) => {
  const {
    type,
    isSpecial,
    view,
    isSlider,
    isMobileResolution,
    content,
    componentType,
    images,
    isSliderDisabled,
  } = useChallengesAndSolutions(props);

  if (!content) {
    return null;
  }

  return (
    <div className={cn(styles[type], styles[view])}>
      <ChallengesSlider
        isMobileResolution={isMobileResolution}
        isSlider={isSlider && isSliderDisabled}
        componentType={componentType}
        type={type}
      >
        {content?.map(({
          title,
          text,
          imagesBundles,
          subtitle,
          contentList,
          image,
          subImage,
          asset,
        }, index) => (
          <div
            key={title || image}
            className={cn(
              styles.contentContainer,
              styles[`contentContainer-${index + 1}`],
              { [styles.special]: isSpecial },
            )}
          >
            {(!asset && title) && (
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
            <div
              className={cn(
                styles.infoContainer,
                styles[`infoContainer-${index + 1}`],
                { [styles.centrefy]: asset },
              )}
            >
              {subImage && (
                <Media
                  asset={subImage}
                  className={styles.subImage}
                />
              )}
              {asset && subtitle && (
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
              {asset && (
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
              {!!contentList?.length && (
                <ul className={styles.listContainer}>
                  {contentList?.map((item, contentIndex) => (
                    <Animated
                      key={`animation_key_${contentIndex + 1}`}
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
            {(asset || !!imagesBundles?.length) && (
              <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                <div className={cn(styles.images, styles[`images-${index + 1}`])}>
                  {asset && (
                    <Media
                      asset={asset}
                      className={cn(styles.image, styles[`image-${index + 1}`])}
                    />
                  )}
                  {imagesBundles?.map((imageBundle, imagesBundlesIndex) => (
                    <Media
                      transparent
                      asset={imageBundle}
                      className={cn(styles.imageBundle, styles[`imageBundle-${imagesBundlesIndex + 1}`])}
                      key={`bundles-images/${imageBundle.url}`}
                    />
                  ))}
                </div>
              </Animated>
            )}
          </div>
        ))}
      </ChallengesSlider>

      {images?.length && images.map((image, index) => (
        <Media
          key={`sectionImage_${index + 1}`}
          asset={image}
          className={styles.sectionImage}
        />
      ))}
    </div>
  );
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  isSpecial: PropTypes.bool,
  view: PropTypes.string,
};

export default ChallengesAndSolutions;
