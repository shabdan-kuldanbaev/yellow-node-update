import cn from 'classnames';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import SectionTitle from 'UI/components/SectionTitle';
import useSectionProps from './utils/useSectionProps';
import styles from './styles.module.scss';

const CallToAction = dynamic(() => import('UI/components/CallToAction'));

const DownloadSection = (props) => {
  const {
    title,
    description,
    subtitle,
    view,
    buttonTitle,
    type,
    handleOnCTAClick,
  } = useSectionProps(props);

  return (
    <section
      className={cn(
        styles[type],
        styles[view],
        styles.container,
      )}
    >
      <div className={styles.contentWrapper}>
        <SectionTitle
          title={title}
          subtitle={subtitle}
          description={description}
          titleStyle={styles.titleStyle}
          className={styles.titleWrapper}
        />
        {buttonTitle && (
          <CallToAction
            handleOnClick={handleOnCTAClick}
            buttonTitle={buttonTitle}
            className={styles.callToAction}
          />
        )}
      </div>
    </section>
  );
};

DownloadSection.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default DownloadSection;
