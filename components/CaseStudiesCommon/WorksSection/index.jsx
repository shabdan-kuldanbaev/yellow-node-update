import React from 'react';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from './styles.module.scss';

const WireframesSection = ({ data, type }) => {
  const sectionBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(data, 'background', {})),
    { fm: 'png' },
  );
  const sectionStyle = sectionBackgroundImage ? { backgroundImage: `url(${sectionBackgroundImage})` } : {};

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
        {data.contentModules.map(({ fields }, index) => (
          fields.title ? (
            <div className={styles.step}>
              <div className={styles.markNumber}>
                <div className={styles.contentMarkNumber}>{index + 1}</div>
              </div>
              <div className={styles.stepTitle}>{fields.title}</div>
            </div>
          )
            : null
        ))}
      </div>
      <div className={styles.imagesConatiner}>
        {data.images.map(({ fields }) => (
          <img
            className={styles.image}
            src={fields.file.url}
            alt="123"
          />
        ))}
      </div>
    </section>
  );
};

export default WireframesSection;
