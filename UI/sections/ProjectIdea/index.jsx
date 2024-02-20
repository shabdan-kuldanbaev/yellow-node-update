import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import KeyFeatures from 'UI/components/KeyFeatures';
import TeamList from 'UI/components/TeamList';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Typography from 'UI/components/Typography';
import CaseAdditionalContent from 'UI/components/ CaseAdditionalContent';
import SectionTitle from 'UI/components/SectionTitle';
import CaseImageContent from 'UI/components/CaseImageContent';
import Illustration from 'UI/components/Illustration';
import Media from 'UI/components/Media';
import { useProjectIdea } from './utils/useProjectIdea';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const ProjectIdea = (props) => {
  const {
    type,
    view,
    title,
    sectionTitle,
    sectionDescription,
    sectionSubtitle,
    subtitle,
    text,
    additionalContent,
    image,
    delayedAnimation,
    featuresProps,
    teamListProps,
    textContent,
    background,
    images,
  } = useProjectIdea(props);

  return (
    <section className={cn(styles[type], styles.container, styles[view])}>
      {background && (
        <Illustration
          src={background.url}
          alt=""
          className={styles.background}
        />
      )}
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
        <CaseImageContent
          type={type}
          image={image}
          textContent={textContent}
          view={view}
        />
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionIntro}>
            {(title || subtitle) && (
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
            )}
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
              view={view}
            />
          </Animated>
        </div>
        {images?.map((file, index) => (
          <Media
            key={`media=${index + 1}`}
            asset={file}
            className={cn(styles.media, styles[`media-${index + 1}`])}
          />
        ))}
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

ProjectIdea.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
};

export default ProjectIdea;
