import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import SvgGroup from 'components/AppDevelopmentCommon/SvgListSection/SvgGroup';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getSvgSectionProps } from './utils/svgHelper';
import styles from './styles.module.scss';
import Selector from './Selector';
import { getDocumentFields } from '../../../utils/helper';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('components/Common/CallToAction'));

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
  withSelector,
}) => {
  const {
    title,
    description,
    link,
    view,
    iconsGroups,
  } = useMemo(() => getSvgSectionProps(sectionData), [sectionData]);

  const [selectedGroupIndex, setSelectedGroupIndex] = useState(null);

  const displayNames = iconsGroups.map((group) => getDocumentFields(group, ['title']).title);

  const handleSelectedGroupIndexChange = (i) => setSelectedGroupIndex(i);

  useEffect(() => {
    if (!withSelector) {
      return;
    }

    setSelectedGroupIndex(0);
  }, [withSelector]);

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
        )}
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
