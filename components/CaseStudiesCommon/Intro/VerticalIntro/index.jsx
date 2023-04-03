import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { getFileUrl } from 'utils/helper';
import {
  isIntroHasBackground,
  isTitleHasBackground,
  caseStudyLink,
  getIntroProps,
} from './utils/introHelper';
import { TitleText } from './TitleText';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const VerticalIntro = ({
  type,
  introSection,
  data,
}) => {
  const {
    backgroundImageUrl,
    appLogoUrl,
    title,
    subtitle,
    description,
    downloadLink,
    appBackgroundImageUrl,
    sectionBackground,
    experiences,
    imagesBundles,
  } = getIntroProps(type, data);

  return (
    <section
      ref={introSection}
      className={styles[type]}
    >
      <Illustration
        src={sectionBackground}
        layout="fill"
        containerClasses={styles.sectionBackground}
      />
      {isIntroHasBackground(type) && (
        <Illustration
          layout="responsive"
          src={backgroundImageUrl}
          className={styles.backgroundImage}
          alt={type}
        />
      )}
      <div className={styles.introSection}>
        <div className={styles.projectInfoContainer}>
          {appLogoUrl && (
            <Illustration
              layout="responsive"
              className={styles.logo}
              src={appLogoUrl}
              alt={title}
            />
          )}
          <div className={styles.title}>
            <TitleText
              type={type}
              data={title}
            />
            {isTitleHasBackground(type) && (
              <Svg
                type={SVG_IMAGES_TYPES.opensenseTitleBorder}
                className={styles.titleBackground}
              />
            )}
          </div>
          {subtitle && (
            <p className={styles.projectSubtitle}>
              {subtitle}
            </p>
          )}
          {description && (
            <p className={styles.projectDescription}>
              {description}
            </p>
          )}
        </div>
        {caseStudyLink(type, downloadLink)}
        <Illustration
          src={appBackgroundImageUrl}
          alt={appBackgroundImageUrl}
          layout="responsive"
          width={1016}
          height={603}
          objectFit="contain"
          containerClasses={styles.imageContainer}
          className={styles.image}
          // Temporary solution until image problems are fixed
          scale={5}
        />
        {imagesBundles?.map((bundle) => {
          const bundleUrl = getFileUrl(bundle);

          return (
            <Illustration
              layout="responsive"
              className={styles.bundleImage}
              src={bundleUrl}
              alt=""
              key={`intro-images-bundles/${bundleUrl}`}
            />
          );
        })}
      </div>
      {experiences && (
        <div className={styles.experiencesContainer}>
          {experiences.map(({
            fields: {
              title: experienceTitle,
              text,
            },
          }) => (
            <div
              key={experienceTitle}
              className={styles.experience}
            >
              <p className={styles.infoTitle}>
                {experienceTitle}
              </p>
              <ContentfulParser document={text} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

VerticalIntro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default VerticalIntro;
