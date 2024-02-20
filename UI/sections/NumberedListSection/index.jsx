import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useCheckListSection from './utils/useNumberedListSection';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const NumberWithText = dynamic(() => import('UI/components/Cards/NumberWithText'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));

const NumberedListSection = (props) => {
  const {
    list,
    type,
    view,
    title,
    description,
    handleOnCTAClick = () => {},
    noCardBackground,
    linkData,
  } = useCheckListSection(props);

  if (!list.length) {
    return null;
  }

  return (
    <section className={cn(styles.checkListSection, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.checkList}>
          {list.map((text, index) => (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              key={`numbered-list/${index}`}
              transitionDelay={50 * index}
            >
              <NumberWithText
                value={index + 1}
                className={styles.card}
                noBackground={noCardBackground}
              >
                {text}
              </NumberWithText>
            </Animated>
          ))}
        </div>

        {linkData && (
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50}
          >
            <CallToAction
              data={linkData}
              handleOnClick={handleOnCTAClick}
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </section>
  );
};

NumberedListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default NumberedListSection;
