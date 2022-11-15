import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import SvgGroup from 'UI/containers/SvgGroup';
import Selector from 'UI/components/Selector';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { useSvgListSection } from './utils/useSvgListSection';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'));

const SvgListSection = (props) => {
  const {
    title,
    description,
    link,
    view,
    iconsGroups,
    handleOnCTAClick,
    type,
    withSelector,
    handleSelectedGroupIndexChange,
    displayNames,
    selectedGroupIndex,
  } = useSvgListSection(props);

  return (
    <section className={cn(styles[type], styles[view])}>
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      {withSelector && (
        <Selector
          displayNames={displayNames}
          selectedIndex={selectedGroupIndex}
          onSelectedIndexChange={handleSelectedGroupIndexChange}
        />
      )}
      {withSelector
        && (
          <SvgGroup
            data={iconsGroups[selectedGroupIndex]}
            className={styles.svgList}
            isSwiperEnabled
            hideTitle
          />
        ) }
      {!withSelector && iconsGroups.map((group, i) => (
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
  withSelector: false,
};

SvgListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  withSelector: PropTypes.bool,
};

export default SvgListSection;
