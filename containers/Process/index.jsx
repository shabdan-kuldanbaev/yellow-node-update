import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { fetchLayoutData } from 'redux/actions/layout';
import { Process, MetaTags } from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  fetchLayoutData: getProcessJSON,
  processes: { json },
}) => {
  useEffect(() => {
    if (!json.length) {
      getProcessJSON({ slug: PAGES.process });
    }
  }, [json]);

  return (
    <Fragment>
      <MetaTags page={PAGES.process} />
      <section ref={introSection} className={styles.process}>
        <Process processes={json} />
      </section>
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  fetchLayoutData: PropTypes.func.isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
  { fetchLayoutData },
)(ProcessContainer);
