import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import SvgGroup from './SvgGroup';
import { getSvgSectionProps } from './utils/svgHelper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'));

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
}) => {
  const isMobileResolution = useSelector(selectIsMobileResolutions);
  const {
    title,
    description,
    link,
    view,
    animatedProps,
    technologiesGroup,
  } = getSvgSectionProps(sectionData, isMobileResolution);

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      {technologiesGroup.map((group) => (
        <SvgGroup
          data={group}
          isMobileResolution={isMobileResolution}
          className={styles.svgList}
          animatedProps={animatedProps}
          listWrapperClassName={styles.svgListWrapper}
        />
      ))}
      {link && (
        <Animated
          {...animatedProps}
          transitionDelay={550}
        >
          <CallToAction
            type="card"
            title={link.linkTitle}
            buttonTitle={link.buttonTitle}
            handleOnClick={handleOnCTAClick}
            className={styles.callToAction}
          />
        </Animated>
      )}
    </section>
  );
};

SvgListSection.defaultProps = {
  handleOnCTAClick: () => {},
};

SvgListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default SvgListSection;
