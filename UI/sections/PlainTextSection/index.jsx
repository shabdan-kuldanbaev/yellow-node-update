import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle } from 'UI/components/SectionTitle';
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
    <div className={cn(styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
      </div>
    </div>
  );
};

PlainTextSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlainTextSection;
