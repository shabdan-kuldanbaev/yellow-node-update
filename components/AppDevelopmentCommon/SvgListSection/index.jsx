import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { CallToAction } from 'components/Common/CallToAction';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import SvgGroup from './SvgGroup';
import { getSvgSectionProps } from './utils/svgHelper';
import styles from './styles.module.scss';

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
  isMobileResolution,
}) => {
  const {
    title,
    description,
    link,
    view,
    animatedProps,
    contentModules,
  } = getSvgSectionProps(sectionData, isMobileResolution);

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        description={description}
      />
      {contentModules.map((group) => (
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
  isMobileResolution: false,
};

SvgListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  isMobileResolution: PropTypes.bool,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(SvgListSection);
