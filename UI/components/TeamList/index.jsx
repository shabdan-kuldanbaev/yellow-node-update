import React from 'react';
import PropTypes from 'prop-types';
import Animated from 'UI/containers/Animated';
import Typography from 'UI/components/Typography';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useTeamSection } from './utils/useTeamSection';
import styles from './styles.module.scss';

const TeamList = (props) => {
  const {
    type,
    title,
    images,
    contentList,
  } = useTeamSection(props);

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={styles[type]}>
        <Typography
          variant="h2"
          className={styles.title}
        >
          {title}
        </Typography>
        {contentList?.map((member) => (
          <Typography
            key={member}
            variant="p"
            className={styles.teamItem}
          >
            {member}
          </Typography>
        ))}
        {images.map((imgUrl) => (
          <img
            className={styles.bundleImage}
            src={imgUrl}
            alt={title}
            key={`intro-images-bundles/${imgUrl}`}
          />
        ))}
      </div>
    </Animated>
  );
};

TeamList.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamList;
