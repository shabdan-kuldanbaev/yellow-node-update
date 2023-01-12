import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const PlainTextSection = (props) => {
  const {
    title,
    description,
    subtitle,
    view,
    type,
  } = useSectionProps(props);

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        titleStyle={styles.titleStyle}
      />
    </section>
  );
};

PlainTextSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlainTextSection;
