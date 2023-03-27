import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import CardContainer from 'UI/containers/CardContainer';
import SectionTitle from 'UI/components/SectionTitle';
import Selector from 'UI/components/Selector';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));
const ContentfulParser = dynamic(() => import('components/BlogCommon/Article/ContentfulParser'));

const TabsSection = (props) => {
  const {
    onChangeActiveTab,
    handleOnCTAClick,
    tabs,
    activeTab,
    title,
    description,
    view,
    type,
    displayNames,
    linkAfterBlock,
    tabsHaveContentInBlocks,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.section, styles[type], styles[view])}>
      <div className={styles.container}>
        <SectionTitle
          title={title}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <Selector
          type={type}
          displayNames={displayNames}
          selectedIndex={activeTab}
          onSelectedIndexChange={onChangeActiveTab}
        />
        <CardContainer className={styles.card}>
          {tabs?.map(({ text, link, texts }, index) => (
            <div
              key={`card/${index}`}
              className={cn(styles.cardWrapper, {
                [styles.cardWrapperActive]: index === activeTab,
              })}
            >
              <div className={styles.cardText}>
                {tabsHaveContentInBlocks ? texts.map((txt, i) => (
                  <div
                    key={`cardText/${i}`}
                    className={styles.cardTextColumn}
                  >
                    <ContentfulParser document={txt} />
                  </div>
                )) : (
                  <div
                    key={`cardText/${index}`}
                    className={styles.cardTextColumn}
                  >
                    <ContentfulParser document={text} />
                  </div>
                )}
              </div>
              {link && (
                <CallToAction
                  title={link.title}
                  buttonTitle={link.buttonTitle}
                  handleOnClick={handleOnCTAClick}
                  className={styles.link}
                />
              )}
            </div>
          ))}
        </CardContainer>
        {!!linkAfterBlock && (
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50}
          >
            <CallToAction
              type="card"
              title={linkAfterBlock.title}
              buttonTitle={linkAfterBlock.buttonTitle}
              handleOnClick={handleOnCTAClick}
              className={styles.callToAction}
            />
          </Animated>
        )}
      </div>
    </section>
  );
};

TabsSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
  handleOnCTAClick: PropTypes.func.isRequired,
};

export default TabsSection;
