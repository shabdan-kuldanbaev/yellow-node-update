import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CallToAction from 'UI/components/CallToAction';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import CardContainer from 'UI/containers/CardContainer';
import SectionTitle from 'UI/components/SectionTitle';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const TabsSection = (props) => {
  const {
    handleOnClick,
    handleOnCTAClick,
    tabs,
    activeIndex,
    title,
    description,
    view,
    type,
  } = useSectionProps(props);

  return (
    <section className={cn(styles[type], styles[view])}>
      <div className={styles.container}>
        <SectionTitle
          title={title}
          description={description}
          titleStyle={styles.titleStyle}
        />
        <div className={styles.tabs}>
          {tabs?.map(({ tabTitle }, index) => (
            <h3
              key={`tab/${index}`}
              className={cn(styles.tabTitle, {
                [styles.tabTitleActive]: index === activeIndex,
              })}
              onClick={handleOnClick(index)}
            >
              {tabTitle}
            </h3>
          ))}
        </div>
        <CardContainer className={styles.card}>
          {tabs?.map(({
            texts,
            link,
          }, index) => (
            <div
              key={`card/${index}`}
              className={cn(styles.cardWrapper, {
                [styles.cardWrapperActive]: index === activeIndex,
              })}
            >
              <div className={styles.cardText}>
                {texts.map((text, textIndex) => (
                  <div
                    key={`cardText/${textIndex}`}
                    className={styles.cardTextColumn}
                  >
                    <ContentfulParser document={text} />
                  </div>
                ))}
              </div>
              {link
                && (
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
