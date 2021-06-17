import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import AppFeatures from 'components/CaseStudiesCommon/AppFeatures';
import ChallengesAndSolutions from 'components/CaseStudiesCommon/ChallengesAndSolutions';
import ProjectIdea from 'components/CaseStudiesCommon/ProjectIdea';
import Wireframes from 'components/CaseStudiesCommon/Wireframes';
import Intro from 'components/CaseStudiesCommon/Intro';
import Images from 'components/CaseStudiesCommon/Images';
import { getFileUrl } from 'utils/helper';
import { CASE_STUDIES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const CaseStudiesCommon = ({
  introSection,
  children,
  type,
  data,
}) => {
  switch (data.type) {
  case CASE_STUDIES_TYPES.intro:
    return (
      <Intro
        introSection={introSection}
        type={type}
        data={data}
      />
    );
  case CASE_STUDIES_TYPES.projectIdea:
    return (
      <section className={cn(
        styles.container,
        styles[type],
        styles.idea,
      )}
      >
        <ProjectIdea
          type={type}
          data={data}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.challenges:
    return (
      <section className={cn(styles.container, styles.challenges,
        {
          [styles[type]]: data.images,
          [styles.challengesWithoutImage]: data.images,
        })}
      >
        {children}
        <ChallengesAndSolutions data={data} />
        <Wireframes
          type={type}
          data={data}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.specialChallenges: {
    const backgroundImageUrl = getFileUrl(get(data, 'images[0]', {}));
    const backgroundImage = { backgroundImage: `url(${backgroundImageUrl}), linear-gradient(180deg, #D45D94 0%, #FA717D 100%)` };

    return (
      <section
        className={cn(
          styles.container,
          styles[type],
          styles.special,
        )}
        style={backgroundImage}
      >
        <ChallengesAndSolutions data={data} />
      </section>
    );
  }
  case CASE_STUDIES_TYPES.wireframe:
    return (
      <section className={cn(
        styles.container,
        styles[type],
        styles.wireframes,
      )}
      >
        {children}
        <Wireframes
          type={type}
          data={data}
        />
      </section>
    );
  case CASE_STUDIES_TYPES.appFeatures:
    return (
      <section className={cn(styles.container, styles[type])}>
        {children}
        <AppFeatures data={data} />
      </section>
    );
  case CASE_STUDIES_TYPES.image:
    return (
      <section className={cn(
        styles.container,
        styles[type],
        styles.imageSection,
      )}
      >
        {children}
        <Images data={data} />
      </section>
    );
  case CASE_STUDIES_TYPES.results:
    return (
      <section className={cn(styles.container, styles[type])}>
        {children}
        <Images data={data} />
      </section>
    );
  default:
    return null;
  }
};

CaseStudiesCommon.defaultProps = {
  children: {},
};

CaseStudiesCommon.propTypes = {
  children: PropTypes.instanceOf(Object),
  introSection: PropTypes.instanceOf(Object).isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default CaseStudiesCommon;
