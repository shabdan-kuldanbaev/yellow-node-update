import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SectionTitle from 'UI/components/SectionTitle';
import Wireframes from 'UI/components/Wireframes';
import { useWireframesSection } from './utils/useWireframesSection';
import styles from './styles.module.scss';

const WireframesSection = (props) => {
  const {
    type,
    title,
    images,
    description,
    sectionStyle,
  } = useWireframesSection(props);

  return (
    <section
      className={cn(styles[type], styles.container)}
      style={sectionStyle}
    >
      <SectionTitle
        title={title}
        description={description}
        type={type}
      />
      <Wireframes
        images={images}
        type={type}
      />
    </section>
  );
};

WireframesSection.prototype = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default WireframesSection;
