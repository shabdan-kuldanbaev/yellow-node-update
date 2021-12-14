import React from 'react';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from './styles.module.scss';

const WorksSection = ({ data, type }) => {
  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage
    ? { backgroundImage: `url(${sectionBackgroundImage})` }
    : {};

  return (
    <section
      className={styles[type]}
      style={sectionStyle}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <div className={styles.sequenceOfSteps}>
        {data.contentModules
          ? data.contentModules.map(({ fields }, index) => {
            if (!fields.title) {
              return null;
            }

            return (
              <div className={styles.step}>
                <div className={styles.markNumber}>
                  <h3 className={styles.contentMarkNumber}>
                    {index + 1}
                  </h3>
                </div>
                <h3 className={styles.stepTitle}>
                  {fields.title}
                </h3>
              </div>
            );
          })
          : null}
      </div>
      <div className={styles.imagesConatiner}>
        {data.images && data.images.map(({ fields }) => (
          <img
            className={styles.image}
            src={fields.file.url}
            alt={fields.title}
          />
        ))}
      </div>
    </section>
  );
};

WorksSection.defaultProps = {
  type: '',
};

WorksSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default WorksSection;
