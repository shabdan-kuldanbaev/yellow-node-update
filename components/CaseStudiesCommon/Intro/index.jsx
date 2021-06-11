import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Svg } from 'components/Common/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Intro = ({
  type,
  introSection,
  appLogo,
  title,
  description,
  imageUrl,
  infoList,
}) => (
  <section
    ref={introSection}
    className={cn(styles.container, styles[type])}
  >
    <div className={styles.projectInfoContainer}>
      <img
        src={appLogo}
        className={styles.logo}
        alt=""
      />
      <h1 className={styles.projectTitle}>
        {title}
      </h1>
      <p className={styles.projectDescription}>
        {description}
      </p>
      <Svg type={SVG_IMAGES_TYPES.appstore} />
    </div>
    <div className={styles.imageContainer}>
      <img
        className={styles.image}
        src={imageUrl}
        alt=""
      />
    </div>
    <div className={styles.infoContainer}>
      {infoList.map((info) => (
        <div key={info.title}>
          <p className={styles.infoTitle}>
            {info.title}
          </p>
          <p className={styles.infoDescription}>
            {info.description}
          </p>
        </div>
      ))}
    </div>
  </section>
);

Intro.propTypes = {
  type: PropTypes.string.isRequired,
  introSection: PropTypes.instanceOf(Object).isRequired,
  appLogo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  infoList: PropTypes.instanceOf(Array).isRequired,
};

export default Intro;
