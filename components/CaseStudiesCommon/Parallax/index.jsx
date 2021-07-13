import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import styles from './styles.module.scss';

const Parallax = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const imageUrl = getOptimizedContentfulImage(
    getFileUrl(data.images[0]),
    {
      fm: 'png',
      fl: 'png8',
    },
  );

  return (
    <section className={styles[`parallax-${type}`]}>
      <SectionTitle
        data={data}
        type={type}
      />
      <section
        className={styles[type]}
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
    </section>
  );
};

Parallax.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Parallax;
