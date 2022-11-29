import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import FAQ from 'UI/containers/FAQ';
import SectionTitle from 'UI/components/SectionTitle';
import { useFaqSection } from './utils/useFaqSection';
import styles from './styles.module.scss';

const FaqSection = (props) => {
  const {
    type,
    title,
    faqList,
    contentModules,
  } = useFaqSection(props);

  if (!contentModules) {
    return null;
  }

  return (
    <section className={cn(styles[type], styles.container)}>
      <SectionTitle
        title={title}
        className={styles.title}
      />
      <FAQ faqList={faqList} />
    </section>
  );
};

FaqSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default FaqSection;
