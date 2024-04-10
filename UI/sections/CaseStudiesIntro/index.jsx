import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'UI/components/SectionTitle';
import Animated from 'UI/containers/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import { useCaseStudiesIntro } from './utils/useCaseStudiesIntro';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));
const Media = dynamic(() => import('UI/components/Media'));

const CaseStudiesIntro = (props) => {
  const {
    type,
    style,
    introSection,
    experiences,
    appLogoUrl,
    appBackgroundImage,
    title,
    subtitle,
    description,
    introText,
    imagesBundles,
    imageBackgroundTitle,
    contentList,
    isAnimatedImg,
  } = useCaseStudiesIntro(props);

  return (
    <section
      ref={introSection}
      className={cn(styles[type], styles.section)}
      style={style}
    >
      <div className={styles.introSection}>
        <div className={styles.contentWrapper}>
          {appLogoUrl && (
            <Illustration
              priority
              transparent
              className={styles.logo}
              src={appLogoUrl}
              alt={appLogoUrl}
            />
          )}
          <SectionTitle
            title={title}
            titleVariant="h1"
            subtitle={subtitle}
            description={description}
            className={styles.sectionTitle}
          >
            {imageBackgroundTitle && (
              <Svg
                type={imageBackgroundTitle}
                className={styles.titleBackground}
              />
            )}
          </SectionTitle>
          <div className={styles.introText}>
            <ContentfulParser document={introText} />
            <div className={styles.introList}>
              {contentList?.map(({ title: itemTitle, text }) => (
                <div
                  key={itemTitle}
                  className={styles.listItem}
                >
                  <span>{itemTitle}</span>
                  <ContentfulParser document={text} />
                </div>
              ))}
            </div>
          </div>
        </div>
        {appBackgroundImage && (
          <div className={styles.imageContainer}>
            <Media
              className={styles.image}
              asset={appBackgroundImage}
            />
          </div>
        )}
        <div className={styles.bundleImagesContainer}>
          {imagesBundles?.map((image, index) => (
            isAnimatedImg
              ? (
                <Animated
                  type={ANIMATED_TYPE.zoomOut}
                  className={cn(styles.bundleAnimated, styles[`bundleAnimated-${index + 1}`])}
                  delay={200 * (index + 1)}
                  key={`intro-images-bundles/${image.url}`}
                >
                  <Media
                    priority
                    transparent
                    className={cn(styles.bundleImage, styles[`bundleImage-${index + 1}`])}
                    asset={image}
                  />
                </Animated>
              ) : (
                <Media
                  priority
                  transparent
                  className={cn(styles.bundleImage, styles[`bundleImage-${index + 1}`])}
                  asset={image}
                  key={`intro-images-bundles/${image.url}`}
                />
              )
          ))}
        </div>
      </div>
      {!!experiences?.length && (
        <div className={styles.experiencesContainer}>
          {experiences?.map(({
            fields: {
              title: experienceTitle,
              text,
            },
          }) => (
            <div
              key={experienceTitle}
              className={styles.experience}
            >
              <div className={styles.infoTitle}>
                {experienceTitle}
              </div>
              <ContentfulParser document={text} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

CaseStudiesIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default CaseStudiesIntro;
