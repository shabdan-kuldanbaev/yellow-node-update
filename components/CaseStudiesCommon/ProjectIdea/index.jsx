import PropTypes from 'prop-types';
import get from 'lodash/get';
import { useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import KeyFeatures from 'components/CaseStudiesCommon/ProjectIdea/KeyFeatures';
import AdditionInformation from 'components/CaseStudiesCommon/ProjectIdea/AdditionInformation';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import TeamSection from 'components/CaseStudiesCommon/ProjectIdea/TeamSection';
import { getDocumentFields } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const ProjectIdea = ({
  type,
  data,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);

  const {
    title,
    subtitle,
    text,
    contentModules,
  } = getDocumentFields(get(data, 'contentModules[1]', {}));
  const delayedAnimation = {
    ...ANIMATION_CASE_STUDY_PROPS,
    delay: 150,
  };

  return (
    <section className={styles[type]}>
      <div className={styles.contentContainer}>
        <KeyFeatures
          features={getDocumentFields(get(data, 'contentModules[0]'))}
          type={type}
        />
        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionIntro}>
            <Animated {...ANIMATION_CASE_STUDY_PROPS}>
              <span className={styles.sectionName}>
                {subtitle}
              </span>
              <h2 className={styles.title}>
                {title}
              </h2>
            </Animated>
            <Animated {...delayedAnimation}>
              <div className={styles.description}>
                <ContentfulParser document={text} />
              </div>
            </Animated>
          </div>
          {!isMobileResolution && (
            <Animated {...delayedAnimation}>
              <AdditionInformation
                additionInformation={contentModules}
                type={type}
              />
            </Animated>
          )}
        </div>
      </div>
      {/* TODO rewrite via the grid */}
      {isMobileResolution && (
        <Animated {...delayedAnimation}>
          <AdditionInformation
            additionInformation={contentModules}
            type={type}
            className={styles.mobileAdditionalInformation}
          />
        </Animated>
      )}
      <TeamSection
        data={getDocumentFields(get(data, 'contentModules[2]'))}
        type={type}
      />
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
