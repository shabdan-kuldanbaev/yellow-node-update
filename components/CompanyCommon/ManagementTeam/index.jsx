import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SectionTitle, Animated } from 'components';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { animatedType } from 'utils/constants';
import {
  getOptimizedImage,
  getDocumentFields,
  getFileUrl,
} from 'utils/helper';
import styles from './styles.module.scss';

export const ManagementTeam = ({ managementTeam, isMobileResolution }) => {
  const { team } = getDocumentFields(managementTeam, ['team']);
  const defaultSize = isMobileResolution ? 530 : 290;

  return (
    <section className={styles.managementTeam}>
      <SectionTitle title="Our management team" />
      <div className={styles.managers}>
        {team && team.map((manager, index) => {
          const {
            name,
            role,
            photo,
          } = getDocumentFields(manager);
          const photoUrl = getOptimizedImage(getFileUrl(photo), defaultSize);

          return (
            <Animated
              key={`special/${index}/${name}`}
              type={animatedType.isCustom}
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
};

ManagementTeam.propTypes = {
  managementTeam: PropTypes.instanceOf(Array).isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect((state) => ({
  isMobileResolution: selectIsMobileResolutions(state),
}))(ManagementTeam);
