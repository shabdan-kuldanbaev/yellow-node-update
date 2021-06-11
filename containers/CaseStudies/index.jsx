import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Wireframe from 'components/CaseStudiesCommon/Wireframe';
import { IMAGES } from 'utils/constants';
import SectionTitle from '../../components/CaseStudiesCommon/SectionTitle';
import Intro from '../../components/CaseStudiesCommon/Intro';
import { COMPONENTS, INFO_LIST } from './util/data';
import styles from './styles.module.scss';

const CaseStudiesContainer = ({ introSection, currentProject }) => (
  <Fragment>
    <Intro
      type={currentProject}
      introSection={introSection}
      infoList={INFO_LIST}
      appLogo={IMAGES.fernwayerLogo}
      title="Fernwayer"
      description="A social media app for those who want to experience something truly unique and for those who are ready to provide it."
      imageUrl={IMAGES.fernwayerImage}
    />
    {COMPONENTS.map(({
      type,
      title,
      alignLeft,
      description,
      tag,
      props,
      images,
      image,
    }, index) => (
      <section
        key={index}
        className={cn(styles.container, styles[type])}
      >
        {title && (
          <SectionTitle
            type={type}
            title={title}
            description={description}
          />
        )}
        {tag && React.createElement(tag, props)}
        {images && images.map((imageUrl) => (
          <Wireframe
            key={imageUrl}
            type={type}
            imageUrl={imageUrl}
          />
        ))}
        {image && (
          <div className={styles.imagContainer}>
            <img
              src={image}
              className={styles.image}
              alt=""
            />
          </div>
        )}
      </section>
    ))}
  </Fragment>
);

CaseStudiesContainer.defaultProps = {
  currentProject: '',
};

CaseStudiesContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  currentProject: PropTypes.string,
};

export default CaseStudiesContainer;
