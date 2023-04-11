import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import KeyFeatures from 'UI/components/KeyFeatures';
import TeamList from 'UI/components/TeamList';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Typography from 'UI/components/Typography';
import CaseAdditionalContent from 'UI/components/ CaseAdditionalContent';
import Illustration from 'UI/components/Illustration';
import { useProjectIdea } from './utils/useProjectIdea';
import styles from './styles.module.scss';
import SectionTitle from '../../components/SectionTitle';

const Animated = dynamic(() => import('UI/containers/Animated'));

const ProjectIdea = (props) => {
  const {
    type,
    title,
    sectionTitle,
    sectionDescription,
    sectionSubtitle,
    subtitle,
    text,
    additionalContent,
    imageUrl,
    delayedAnimation,
    featuresProps,
    teamListProps,
    textContent,
  } = useProjectIdea(props);

  return (
    <section className={cn(styles[type], styles.container)}>
      {sectionTitle && (
        <SectionTitle
          title={sectionTitle}
          subtitle={sectionSubtitle}
          description={sectionDescription}
          className={styles.titleStyle}
        />
      )}
      <div className={styles.contentContainer}>
        <KeyFeatures
          features={featuresProps}
          type={type}
        />
        {imageUrl && (
          <Animated {...ANIMATION_CASE_STUDY_PROPS}>
            <div className={styles.imageContainer}>
              <Illustration
                className={styles.image}
                src={imageUrl}
                alt={title}
              />
            </div>
          </Animated>
        )}
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionIntro}>
            <Animated {...ANIMATION_CASE_STUDY_PROPS}>
              <Typography className={styles.sectionName}>
                {subtitle}
              </Typography>
              <Typography
                variant="h2"
                className={styles.title}
              >
                {title}
              </Typography>
            </Animated>
            <Animated {...delayedAnimation}>
              <div className={styles.description}>
                <ContentfulParser document={text} />
              </div>
            </Animated>
          </div>
          <Animated {...delayedAnimation}>
            <CaseAdditionalContent
              data={additionalContent}
              type={type}
            />
          </Animated>
        </div>
      </div>
      {teamListProps && (
        <TeamList
          data={teamListProps}
          type={type}
        />
      )}
    </section>
  );
};

ProjectIdea.defaultProps = {
  type: '',
  isMobileResolution: false,
};

ProjectIdea.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
};

export default ProjectIdea;
