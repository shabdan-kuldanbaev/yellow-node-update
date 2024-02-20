import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { useSvgListSection } from './utils/useSvgListSection';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));
const Selector = dynamic(() => import('UI/components/Selector'), { ssr: false });
const SvgGroup = dynamic(() => import('UI/containers/SvgGroup'));

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
            type={type}
            view={view}
            data={iconsGroups[selectedGroupIndex]}
            className={styles.svgList}
            isSwiperEnabled
            hideTitle
          />
        </>
      )}
      {!withSelector && iconsGroups.map((group, i) => (
        <SvgGroup
          key={i}
          type={type}
          data={group}
          view={view}
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
            data={link}
            handleOnClick={handleOnCTAClick}
            className={styles.callToAction}
          />
        </Animated>
      )}
    </section>
  );
};

SvgListSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  handleOnCTAClick: PropTypes.func,
  type: PropTypes.string.isRequired,
  withSelector: PropTypes.bool,
};

export default SvgListSection;
