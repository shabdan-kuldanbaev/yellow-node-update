import PropTypes from 'prop-types';
import cn from 'classnames';
import React from 'react';
import { Animated } from 'components/Common/Animated';
import { CallToAction } from 'components/Common/CallToAction';
import styles from './styles.module.scss';
import { SectionTitle } from '../SectionTitle';
import { getRelatedServicesProps } from './utils';
import { RelatedServices } from './RelatedServices';

const RelatedServicesSection = ({ type, sectionData, handleOnCTAClick }) => {
  const {
    title,
    description,
    subtitle,
    services,
    link,
    view,
    animatedProps,
  } = getRelatedServicesProps(sectionData);

  return (
    <div className={cn(styles.relatedServices,
      styles[type],
      styles[view])}
    >
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <RelatedServices services={services} />
        {link && (
          <Animated
            {...animatedProps}
            transitionDelay={550}
          >
            <CallToAction
              type="card"
              title={link.title}
              buttonTitle={link.buttonTitle}
              handleOnClick={handleOnCTAClick}
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </div>
  );
};

RelatedServicesSection.defaultProps = {
  handleOnCTAClick: () => {},
};

RelatedServicesSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default RelatedServicesSection;
