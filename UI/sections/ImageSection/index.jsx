import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const ContentfulParser = dynamic(() => import('components/BlogCommon/Article/ContentfulParser'));
const CallToAction = dynamic(() => import('UI/components/CallToAction'));

const ImageSection = (props) => {
  const {
    title,
    description,
    text,
    imageUrl,
    type,
    view,
    link,
    handleOnCTAClick,
  } = useSectionProps(props);

  if (!imageUrl) return null;

  return (
    <section className={cn(styles[type], styles[view], styles.container)}>
      <div className={styles.imageSection}>
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <div
            className={styles.image}
            style={{ backgroundImage: `url(${imageUrl})` }}
          />
        </Animated>
        <div className={styles.experienceContent}>
          <SectionTitle
            title={title}
            description={description}
            type="side"
            titleStyle={styles.titleStyle}
          />
          <Animated {...REVEAL_ANIMATION_PROPS}>
            <ContentfulParser document={text} />
          </Animated>
        </div>
      </div>
      {!!link && (
        <Animated
          {...REVEAL_ANIMATION_PROPS}
          transitionDelay={50}
        >
          <CallToAction
            title={link.title}
            buttonTitle={link.buttonTitle}
            data={link}
            handleOnClick={handleOnCTAClick}
            className={styles.callToAction}
          />
        </Animated>
      )}
    </section>
  );
};

ImageSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default ImageSection;
