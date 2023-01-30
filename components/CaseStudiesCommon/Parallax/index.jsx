import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getParallaxProps } from './utils/parallaxHelper';
import styles from './styles.module.scss';

const Parallax = ({ data, type }) => {
  if (!get(data, 'images')) {
    return null;
  }

  const {
    imageUrl,
    contentList,
  } = getParallaxProps(data);

  return (
    <section className={styles[`parallaxContainer${type}`]}>
      <SectionTitle
        data={data}
        type={type}
        contentList={contentList}
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
