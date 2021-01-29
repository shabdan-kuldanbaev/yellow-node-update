import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { SectionTitle, Animated } from 'components';
import { ANIMATED_TYPE } from 'utils/constants';
import {
  getOptimizedImage,
  getDocumentFields,
  getFileUrl,
} from 'utils/helper';
import styles from './styles.module.scss';

export const ManagementTeam = ({ managementTeam, isMobileResolution }) => (
  <section className={styles.managementTeam}>
    <SectionTitle title="Our management team" />
    <div className={styles.managers}>
      {managementTeam && managementTeam.map((manager, index) => {
        const { name, role, photo } = getDocumentFields(
          manager,
          ['name', 'role', 'photo'],
        );
        const photoUrl = getOptimizedImage(
          getFileUrl(photo),
          isMobileResolution ? 530 : 290,
        );

        return (
          <Animated
            key={`special/${index}/${name}`}
            type={ANIMATED_TYPE.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={50 + 60 * index}
          >
            <div className={styles.imageContainer}>
              <div className={styles.image} style={{ backgroundImage: `url(${photoUrl})` }} />
            </div>
            <div className={styles.title}>{name}</div>
            <div className={styles.subtitle}>{role}</div>
          </Animated>
        );
      })}
    </div>
  </section>
);

ManagementTeam.propTypes = {
  managementTeam: PropTypes.instanceOf(Array).isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  isMobileResolution: selectIsMobileResolutions(state),
}))(ManagementTeam);
