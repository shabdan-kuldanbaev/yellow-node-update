import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { getDocumentFields } from 'utils/helper';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Images from 'components/CaseStudiesCommon/Images';
import styles from './styles.module.scss';

const DesignSection = ({ data, type }) => {
  if (!get(data, 'contentModules')) {
    return null;
  }

  return (
    <section className={styles[type]}>
      <SectionTitle
        data={data}
        type={type}
      />
      {data.contentModules.map((content) => {
        const contentItem = getDocumentFields(content);

        return (
          <div className={styles.container}>
            <h2 className={styles.title}>
              {contentItem.title}
            </h2>
            <Images
              data={contentItem}
              type="scaled"
            />
          </div>
        );
      })}
    </section>
  );
};

DesignSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default DesignSection;
