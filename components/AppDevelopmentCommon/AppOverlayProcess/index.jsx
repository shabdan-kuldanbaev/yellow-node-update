import PropTypes from 'prop-types';
import CaseStudyOverlayProcess from 'components/CaseStudiesCommon/CaseStudyOverlayProcess';
import styles from './styles.module.scss';

const AppOverlayProcess = ({ section, type }) => {
  const data = section.fields;

  return (
    <section className={styles[type]}>
      <CaseStudyOverlayProcess
        data={data}
        type={type}
      />
    </section>
  );
};

AppOverlayProcess.propTypes = {
  section: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string.isRequired,
};

export default AppOverlayProcess;
