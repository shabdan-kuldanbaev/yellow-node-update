import React from 'react';
import cn from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import Illustration from 'UI/components/Illustration';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from './styles.module.scss';

const WorksSection = ({ data, type }) => {
  if (!data.contentModules) {
    return null;
  }

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
        {data.contentModules.map(({ fields }, index) => {
          if (!fields.title) {
            return null;
          }

          return (
            <div
              className={styles.step}
              key={index}
            >
              <div className={styles.markNumber}>
                <h3 className={styles.contentMarkNumber}>
                  {fields.subtitle}
                </h3>
              </div>
              <h3 className={styles.stepTitle}>
                {fields.title}
              </h3>
              {fields.description
                && (
                  <p className={styles.description}>
                    {fields.description}
                  </p>
                )}
              {fields.imagesBundles && fields.imagesBundles.map((bundle, indexBundleImage) => {
                const bundleUrl = getFileUrl(bundle);

                return (
                  <Illustration
                    layout="responsive"
                    className={cn(styles.bundleImage, styles[`bundleImage-${indexBundleImage + 1}`])}
                    src={bundleUrl}
                    alt={bundle.fields.title}
                    key={`images-bundles/${bundleUrl}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      <div className={styles.imagesConatiner}>
        {data.images && data.images.map(({ fields }) => (
          <Illustration
            layout="responsive"
            className={styles.image}
            src={fields.file.url}
            alt={fields.title}
            key={fields.file.fileName}
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
