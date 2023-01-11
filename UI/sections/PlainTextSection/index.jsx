import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Animated from 'UI/containers/Animated';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

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
    <section className={cn(styles[type], styles[view])}>
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
