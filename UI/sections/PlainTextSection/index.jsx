import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));
const ContentfulParser = dynamic(() => import('components/BlogCommon/Article/ContentfulParser'));

const PlainTextSection = (props) => {
  const {
    title,
    description,
    subtitle,
    view,
    type,
    text,
  } = useSectionProps(props);

  return (
    <section className={cn(styles.plainText, styles[type], styles[view])}>
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
        />
        {text
         && (
           <Animated {...REVEAL_ANIMATION_PROPS}>
             <div className={styles.text}>
               <ContentfulParser document={text} />
             </div>
           </Animated>
         )}
      </div>
    </section>
  );
};

PlainTextSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default PlainTextSection;
