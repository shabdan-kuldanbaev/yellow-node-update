import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { selectIsTabletResolutions } from 'redux/selectors/layout';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import SvgGroup from './SvgGroup';
import { checkSwiperEnabled, getSvgSectionProps } from './utils/svgHelper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'));

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
}) => {
  const isTabletResolution = useSelector(selectIsTabletResolutions);
  const {
    title,
    description,
    link,
    view,
    technologiesGroup,
  } = getSvgSectionProps(sectionData);

  const isSwiperEnabled = useMemo(
    () => checkSwiperEnabled(type, view, isTabletResolution),
    [type,
      view,
      isTabletResolution],
  );

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
};

SvgListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

export default SvgListSection;
