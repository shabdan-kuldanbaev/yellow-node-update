import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import styles from './styles.module.scss';
import usePlaneTextProps from './utils/useSectionProps';

const PlainTextSection = ({
  sectionData,
  pageType,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
  } = usePlaneTextProps(sectionData);

  return (
    <div className={cn(styles[pageType], styles[view])}>
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
  sectionData: PropTypes.instanceOf(Object).isRequired,
  pageType: PropTypes.string.isRequired,
};

export default PlainTextSection;
