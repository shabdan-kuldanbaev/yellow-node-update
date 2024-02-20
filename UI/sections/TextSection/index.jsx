import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import { getDocumentFields } from 'utils/helper';
import styles from './styles.module.scss';

const ContentfulParser = dynamic(() => import('components/BlogCommon/Article/ContentfulParser'));

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
        className={styles.titleStyle}
      />
      {contentModules?.map((document) => {
        const { text } = getDocumentFields(document);

        return <ContentfulParser document={text} />;
      })}
    </div>
  );
};

TextSection.propTypes = {
  sectionData: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default TextSection;
