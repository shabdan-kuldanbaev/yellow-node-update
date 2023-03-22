import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import SvgGroup from 'UI/containers/SvgGroup';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Selector from 'UI/components/Selector';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { useSvgListSection } from './utils/useSvgListSection';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));

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
    text,
  } = useSvgListSection(props);

  return (
    <section
      className={cn(
        styles.section,
        styles[type],
        styles[view],
      )}
    >
      <SectionTitle
        title={title}
        description={description}
        titleStyle={styles.titleStyle}
      />
      {withSelector && (
        <>
          <Selector
            type={type}
            displayNames={displayNames}
            selectedIndex={selectedGroupIndex}
            onSelectedIndexChange={handleSelectedGroupIndexChange}
          />
          <SvgGroup
            data={iconsGroups[selectedGroupIndex]}
            className={styles.svgList}
            isSwiperEnabled
            hideTitle
          />
        </>
      )}
      {text.length && (
        <div className={cn(styles.textContent, styles[type])}>
          <ContentfulParser document={text[selectedGroupIndex]} />
        </div>
      )}
      {!withSelector && iconsGroups.map((group, i) => (
        <SvgGroup
          key={i}
          data={group}
          className={cn(styles.svgList, styles[`svgList${i + 1}`])}
          isSwiperEnabled
        />
      ))}
      {link && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={50}
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
  section: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  withSelector: PropTypes.bool,
};

export default SvgListSection;
