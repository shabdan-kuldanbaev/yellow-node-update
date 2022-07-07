import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import SectionTitle from 'components/Common/SectionTitle';
import Animated from 'components/Common/Animated';
import { ANIMATED_TYPE } from 'utils/constants';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import styles from './styles.module.scss';

export const ManagementTeam = ({ managementTeam, isMobileResolution }) => managementTeam && (
  <section className={styles.managementTeam}>
    <SectionTitle title="Our management team" />
    <div className={styles.managers}>
      {managementTeam && managementTeam.map((manager, index) => {
        const { image, title, subtitle } = getDocumentFields(
          manager,
          ['image', 'title', 'subtitle'],
        );
        const photoUrl = getOptimizedContentfulImage(
          getFileUrl(image),
          { width: isMobileResolution ? 530 : 290 },
        );

        return (
          <Animated
            key={`special/${title}`}
            type={ANIMATED_TYPE.isCustom}
            translateY="2.82352941em"
            opasityDuration={1}
            transformDuration={1}
            transitionDelay={50 + 50 * index}
          >
            <div className={styles.imageContainer}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${photoUrl})` }}
              />
            </div>
            <div className={styles.title}>
              {title}
            </div>
            <div className={styles.subtitle}>
              {subtitle}
            </div>
          </Animated>
        );
      })}
    </div>
  </section>
);

ManagementTeam.defaultProps = {
  isMobileResolution: false,
  managementTeam: [],
};

ManagementTeam.propTypes = {
  managementTeam: PropTypes.instanceOf(Array),
  isMobileResolution: PropTypes.bool,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(ManagementTeam);
