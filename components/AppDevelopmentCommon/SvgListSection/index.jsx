import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsTabletResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { CallToAction } from 'components/Common/CallToAction';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { PAGES, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import SvgGroup from './SvgGroup';
import { checkSwiperEnabled, getSvgSectionProps, isSwiperEnabled } from './utils/svgHelper';
import styles from './styles.module.scss';

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
  isTabletResolution,
}) => {
  const {
    title,
    description,
    link,
    view,
    animatedProps,
    technologiesGroup,
  } = getSvgSectionProps(sectionData);

  const isSwiperEnabled = useMemo(() => checkSwiperEnabled(type, view, isTabletResolution),
    [type,
      view,
      isTabletResolution]);

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      {technologiesGroup.map((group, i) => (
        <SvgGroup
          key={i}
          data={group}
          className={styles.svgList}
          isSwiperEnabled={isSwiperEnabled}
        />
      ))}
      {link && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
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
  isTabletResolution: false,
};

SvgListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  isTabletResolution: PropTypes.bool,
};

export default connect(
  (state) => ({
    isTabletResolution: selectIsTabletResolutions(state),
  }),
)(SvgListSection);
