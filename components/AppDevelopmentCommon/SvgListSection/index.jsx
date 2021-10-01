import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/AppDevelopmentCommon/Svg';
import { CallToAction } from 'components/Common/CallToAction';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import { getSvgSectionProps } from './utils/svgHelper';
import styles from './styles.module.scss';

const SvgListSection = ({
  sectionData,
  handleOnCTAClick,
  type,
  isMobileResolution,
}) => {
  const {
    title,
    description,
    technologies,
    link,
    view,
    animatedProps,
  } = getSvgSectionProps(sectionData, isMobileResolution);

  return (
    <section className={cn(styles[type], styles[view])}>
      <div className={styles.svgListWrapper}>
        <SectionTitle
          title={title}
          description={description}
        />
        <div className={styles.svgList}>
          {technologies.map((technology, technologyIndex) => {
            if (isMobileResolution) {
              return (
                <div>
                  <Svg type={technology} />
                </div>
              );
            }

            return (
              <Animated
                key={`technologies/${technology}`}
                {...animatedProps}
                transitionDelay={300 + 50 * technologyIndex}
              >
                <Svg type={technology} />
              </Animated>
            );
          })}
        </div>
        {link && (
          <Animated
            {...animatedProps}
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
      </div>
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
  isMobileResolution: PropTypes.bool.isRequired,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(SvgListSection);
