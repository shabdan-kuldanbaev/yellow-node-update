import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Images from 'components/CaseStudiesCommon/Images';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const ImagesSection = ({
  data,
  type,
}) => {
  const { imagesBundles } = getDocumentFields(get(data, 'contentModules[0]'), ['imagesBundles']);

  return (
    <section className={cn(styles[type], styles[data.view])}>
      {imagesBundles && imagesBundles.map((image) => {
        const imgUrl = getFileUrl(image);

        return (
          <img
            className={styles.bundleImage}
            src={imgUrl}
            alt=""
            key={`intro-images-bundles/${imgUrl}`}
          />
        );
      })}
      <SectionTitle
        data={data}
        type={type}
      />
      <Images
        data={data}
        type={type}
        view={data.view}
      />
      <p className={styles.secondDescription}>{data.subtitle}</p>
    </section>
  );
};

ImagesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesSection;
