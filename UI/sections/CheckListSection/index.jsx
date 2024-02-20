import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import SectionTitle from 'UI/components/SectionTitle';
import styles from './styles.module.scss';
import useCheckListSection from './utils/useCheckListSection';

const Animated = dynamic(() => import('UI/containers/Animated'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));
const CheckWithText = dynamic(() => import('UI/components/Cards/CheckWithText'));

const CheckListSection = (props) => {
  const {
    list,
    type,
    view,
    title,
    description,
    link,
    handleOnCTAClick = () => {},
    noCardBackground,
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
          className={styles.sectionTitle}
        />
        <div className={styles.checkList}>
          {list.map((text, index) => (
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              key={`check-list/${index}`}
              transitionDelay={50 * index}
            >
              <CheckWithText
                className={styles.card}
                noBackground={noCardBackground}
              >
                {text}
              </CheckWithText>
            </Animated>
          ))}
        </div>
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
      </div>
    </section>
  );
};

CheckListSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func,
};

export default CheckListSection;
