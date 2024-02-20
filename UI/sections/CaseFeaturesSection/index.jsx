import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Illustration from 'UI/components/Illustration';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useFeaturesSection } from './utils/useFeaturesSection';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));
const Animated = dynamic(() => import('UI/containers/Animated'));

const CaseFeaturesSection = (props) => {
  const {
    type,
    data,
    contentModules,
    title,
    imageUrl,
    featuresList,
  } = useFeaturesSection(props);

  if (!contentModules?.length) {
    return null;
  }

  return (
    <section className={cn(styles[type], styles.container)}>
      <SectionTitle
        type={type}
        title={data.title}
        subtitle={data.subtitle}
        description={data.description}
        className={styles.titleStyles}
      />
      <div className={styles.mainContainer}>
        <div className={styles.featuresList}>
          {featuresList.map(({ featureTitle, text }, index) => (
            <Animated
              key={`${title} ${index}`}
              delay={50 * index}
              {...ANIMATION_CASE_STUDY_PROPS}
            >
              <div className={styles.featureContainer}>
                <div className={styles.checkMark}>
                  <Svg
                    className={styles.icon}
                    type={SVG_IMAGES_TYPES.checkMark}
                  />
                </div>
                <div className={styles.contentContainer}>
                  <h3 className={styles.title}>
                    {featureTitle}
                  </h3>
                  <ContentfulParser document={text} />
                </div>
              </div>
            </Animated>
          ))}
        </div>
        <div className={styles.imageContainer}>
          {imageUrl && (
            <Animated
              delay={50}
              {...ANIMATION_CASE_STUDY_PROPS}
            >
              <div>
                <Illustration
                  className={styles.image}
                  src={imageUrl}
                  alt={title}
                />
              </div>
            </Animated>
          )}
        </div>
      </div>
    </section>
  );
};

CaseFeaturesSection.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default CaseFeaturesSection;
