import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SectionTitle } from 'components/AppDevelopmentCommon/SectionTitle';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const TextSection = ({ sectionData, type }) => {
  const {
    title,
    subtitle,
    description,
    contentModules,
  } = getDocumentFields(sectionData);

  return (
    <div className={cn(styles.textSection, styles[type])}>
      <SectionTitle
        title={title}
        subtitle={subtitle}
        description={description}
        titleStyle={styles.titleStyle}
      />
      {contentModules?.map((document) => {
        const { text } = getDocumentFields(document);

        return <ContentfulParser document={text} />;
      })}
    </div>
  );
};

TextSection.defaultProps = {
  type: null,
};

TextSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default TextSection;
