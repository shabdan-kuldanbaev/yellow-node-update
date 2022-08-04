import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import SvgGroup from 'components/AppDevelopmentCommon/SvgListSection/SvgGroup';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getSvgSectionProps } from './utils/svgHelper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'));

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
}) => {
  const {
    title,
    description,
    link,
    view,
    iconsGroup,
  } = getSvgSectionProps(sectionData);

  // TODO: uncomment when restoring default values in global store will be fixed
  // const isTabletResolution = useSelector(selectIsTabletResolutions);
  // const isSwiperEnabled = useMemo(
  //   () => checkSwiperEnabled(type, view, isTabletResolution),
  //   [type,
  //     view,
  //     isTabletResolution],
  // );

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      {iconsGroup.map((group, i) => (
        <SvgGroup
          key={i}
          data={group}
          className={styles.svgList}
          isSwiperEnabled
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
