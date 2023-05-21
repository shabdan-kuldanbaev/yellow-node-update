import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'UI/components/SectionTitle';
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
    appBackgroundImageUrl,
    title,
    subtitle,
    description,
    introText,
    imagesBundlesWithUrls,
    imageBackgroundTitle,
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
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Illustration
            priority
            transparent
            className={styles.image}
            src={appBackgroundImageUrl}
            alt={appBackgroundImageUrl}
          />
        </div>
        {imagesBundlesWithUrls?.map((bundleUrl, index) => (
          <Illustration
            priority
            transparent
            className={cn(styles.bundleImage, styles[`bundleImage-${index + 1}`])}
            src={bundleUrl}
            alt={title}
            key={`intro-images-bundles/${bundleUrl}`}
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
