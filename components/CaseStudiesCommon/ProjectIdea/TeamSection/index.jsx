import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import { getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../../utils/data';
import { TitleUnderline } from './TitleUnderline';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const TeamSection = ({ type, data }) => {
  if (!data) {
    return null;
  }

  const {
    title,
    contentList,
    imagesBundles,
  } = data;

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={styles[type]}>
        <h2 className={styles.title}>
          {title}
          <TitleUnderline type={type} />
        </h2>
        {contentList && contentList.map((member) => (
          <p
            key={member}
            className={styles.teamItem}
          >
            {member}
          </p>
        ))}
        {imagesBundles && imagesBundles.map((image) => {
          const imgUrl = getFileUrl(image);

          return (
            <Illustration
              layout="responsive"
              className={styles.bundleImage}
              src={imgUrl}
              alt={title}
              key={`intro-images-bundles/${imgUrl}`}
            />
          );
        })}
      </div>
    </Animated>
  );
};

TeamSection.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default TeamSection;
