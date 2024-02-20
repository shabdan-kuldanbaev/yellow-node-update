import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import CallToAction from 'UI/components/CallToAction';
import { ANIMATED_TYPE, REVEAL_ANIMATION_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const Process = ({
  processes = [],
  handleOnCTAClick = () => {},
}) => (
  <section className={styles.sectionProcess}>
    <div className={styles.contentWrapper}>
      {processes?.map(({
        name,
        description,
        json,
      }, index) => (
        <div
          className={styles.process}
          key={`processes/${name}`}
          data-index={index}
        >
          <div>
            <Animated {...REVEAL_ANIMATION_PROPS}>
              <h2 className={styles.title}>
                <span>{`${index + 1}.`}</span>
                {name}
              </h2>
            </Animated>
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={40}
            >
              <p className={styles.description}>
                {description}
              </p>
            </Animated>
          </div>
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <Animated
              type={ANIMATED_TYPE.isJSON}
              jsonFile={json}
              className={styles.jsonWrapper}
            />
          </Animated>
        </div>
      ))}

      <Animated
        {...REVEAL_ANIMATION_PROPS}
        transitionDelay={50}
      >
        <CallToAction
          type="page"
          title="Kickstart your dream project with us!"
          buttonTitle="Contact us"
          handleOnClick={handleOnCTAClick}
          className={styles.callToAction}
        />
      </Animated>
    </div>
  </section>
);

Process.propTypes = {
  processes: PropTypes.instanceOf(Array),
  handleOnCTAClick: PropTypes.func,
};

export default Process;
