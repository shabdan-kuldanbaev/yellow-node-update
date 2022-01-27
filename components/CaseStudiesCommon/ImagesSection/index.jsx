import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import Images from 'components/CaseStudiesCommon/Images';
import { FAMLICIOUS_SPECIAL_IMG_SECTIONS } from 'utils/constants';
import styles from './styles.module.scss';

const ImagesSection = ({
  data,
  type,
}) => (
  <section
    className={cn(styles[type], styles[data.view], {
      [styles.famliciousSpecialImageSection]: FAMLICIOUS_SPECIAL_IMG_SECTIONS.includes(data.title),
    })}
  >
    <SectionTitle
      data={data}
      type={type}
    />
    <Images
      data={data}
      type={type}
      view={data.view}
    />
  </section>
);

ImagesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImagesSection;
