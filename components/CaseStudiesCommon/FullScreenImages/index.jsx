import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getFileUrl } from 'utils/helper';
import styles from './styles.module.scss';

const FullScreenImages = ({
  data,
  type,
}) => {
  if (!get(data, 'images')) {
    return null;
  }

  const imageUrl = getFileUrl(get(data, 'images[0]', {}));

  return (
    <section
      className={cn(styles[type], styles[data.view])}
    >
      <SectionTitle
        data={data}
        type={type}
      />
      <img
        className={styles.image}
        src={imageUrl}
        alt={type}
      />
    </section>
  );
};

FullScreenImages.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FullScreenImages;
