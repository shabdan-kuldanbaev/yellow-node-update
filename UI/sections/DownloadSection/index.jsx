import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CallToAction from 'components/Common/CallToAction';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const DownloadSection = ({
  data,
  type,
}) => {
  const {
    title,
    description,
    subtitle,
    view,
    link,
  } = useSectionProps(data);

  return (
    <section className={cn(styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
          className={styles.titleWrapper}
        />
        {link && (
          <CallToAction
            href={link.slug}
            buttonTitle={link.buttonTitle}
            className={styles.callToAction}
          />
        )}
      </div>
    </section>
  );
};

DownloadSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default DownloadSection;
