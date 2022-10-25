import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import CallToAction from 'components/Common/CallToAction';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import SectionTitle from 'components/CaseStudiesCommon/SectionTitle';
import { getTabBlocks } from './utils/index';
import styles from './styles.module.scss';

const TabsSection = ({
  data,
  type,
  handleOnCTAClick,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabs = getTabBlocks(data);

  const handleOnClick = (index) => () => {
    setActiveIndex(index);
  };

  return (
    <section className={cn(styles[type], styles[data.view])}>
      <div className={styles.container}>
        <SectionTitle
          data={data}
          type={type}
        />
        <div className={styles.tabs}>
          {tabs.map(({ tabTitle }, index) => (
            <h3
              className={cn(styles.tabTitle, {
                [styles.tabTitleActive]: index === activeIndex,
              })}
              onClick={handleOnClick(index)}
            >
              {tabTitle}
            </h3>
          ))}
        </div>
        <div className={styles.card}>
          {tabs.map(({ texts, link }, index) => (
            <div className={cn(styles.cardWrapper, {
              [styles.cardWrapperActive]: index === activeIndex,
            })}
            >
              <div className={styles.cardText}>
                {texts.map((text) => (
                  <div className={styles.cardTextColumn}>
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
        </div>
      </div>
    </section>
  );
};

TabsSection.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default TabsSection;
