import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'UI/components/SectionTitle';
import Video from 'components/Common/Video';
import { useCaseStudiesIntro } from './utils/useCaseStudiesIntro';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

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
    imagesBundlesWithUrls,
    imageBackgroundTitle,
    isVideo,
    contentList,
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
        <div className={styles.imageContainer}>
          {isVideo ? (
            <Video
              src={appBackgroundImage.url}
              className={styles.video}
            />
          ) : (
            <Illustration
              priority
              transparent
              className={styles.image}
              src={appBackgroundImage.url}
              alt={appBackgroundImage.alt}
            />
          )}
        </div>
        {imagesBundlesWithUrls?.map((image, index) => (
          <Illustration
            priority
            transparent
            className={cn(styles.bundleImage, styles[`bundleImage-${index + 1}`])}
            src={image.url}
            key={`intro-images-bundles/${image.url}`}
          />
        ))}
      </div>
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
    </section>
  );
};

CaseStudiesIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default CaseStudiesIntro;
