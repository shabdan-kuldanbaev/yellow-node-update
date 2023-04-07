import PropTypes from 'prop-types';
import { createMarkup } from 'utils/helper';
import styles from './styles.module.scss';

const Project = ({ body, introSection }) => (
  <section
    ref={introSection}
    className={styles.projectContainer}
  >
    {body && <div dangerouslySetInnerHTML={createMarkup(body)} />}
  </section>
);

Project.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  body: PropTypes.string.isRequired,
};

export default Project;
