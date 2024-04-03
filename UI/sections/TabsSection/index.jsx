import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import CardContainer from 'UI/containers/CardContainer';
import SectionTitle from 'UI/components/SectionTitle';
import Selector from 'UI/components/Selector';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Illustration from 'UI/components/Illustration';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const ContentfulParser = dynamic(() => import('components/BlogCommon/Article/ContentfulParser'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));
const Animated = dynamic(() => import('UI/containers/Animated'));
const FigmaPrototype = dynamic(() => import('components/Common/FigmaPrototype'), { ssr: false });

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
          view={view}
          type={type}
          displayNames={displayNames}
          selectedIndex={activeTab}
          onSelectedIndexChange={onChangeActiveTab}
        />
        <CardContainer className={styles.cardContainer}>
          {tabs.map(({
            text,
            link,
            content,
          }, index) => (
            <div
              key={`card/${index}`}
              className={cn(
                styles.cardWrapper,
                styles[`cardWrapper-${index + 1}`],
                {
                  [styles.cardWrapperActive]: index === activeTab,
                },
              )}
            >
              <Animated {...REVEAL_ANIMATION_PROPS}>
                <div className={cn(styles.cardContent, styles[`cardContent-${index + 1}`])}>
                  {tabsHaveContentInBlocks ? content?.map(({
                    text: blockText,
                    imageUrl,
                    prototypeUrl,
                    imagesBundles,
                  }, i) => (
                    <div
                      key={`cardText/${i}`}
                      className={cn(styles.contentBlock, styles[`contentBlock-${i + 1}`])}
                    >
                      {imageUrl && (
                        <Illustration
                          priority
                          unoptimized
                          src={imageUrl.url}
                          className={styles.blockImage}
                          alt={imageUrl.alt}
                        />
                      )}
                      {prototypeUrl && (
                        <FigmaPrototype
                          src={prototypeUrl}
                          className={styles.blockPrototype}
                        />
                      )}
                      {blockText && <ContentfulParser document={blockText} />}
                      {imagesBundles?.map((file, y) => (
                        <Illustration
                          key={y}
                          src={file.url}
                          className={cn(styles.imageBundle, styles[`imageBundle-${y + 1}`])}
                          alt={file.alt}
                        />
                      ))}
                    </div>
                  )) : (
                    <div
                      key={`cardText/${index}`}
                      className={styles.contentBlock}
                    >
                      <ContentfulParser document={text} />
                    </div>
                  )}
                </div>
                {link && (
                  <CallToAction
                    data={link}
                    handleOnClick={handleOnCTAClick}
                    className={styles.link}
                  />
                )}
              </Animated>
            </div>
          ))}
        </CardContainer>
        {!!linkAfterBlock && (
          <Animated
            {...REVEAL_ANIMATION_PROPS}
            transitionDelay={50}
          >
            <CallToAction
              data={linkAfterBlock}
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
