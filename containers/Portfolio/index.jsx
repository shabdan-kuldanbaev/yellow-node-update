import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectWorks, selectIsLoading } from 'redux/selectors/portfolio';
import { loadWorks } from 'redux/actions/portfolio';
import { Portfolio, Loader } from 'components';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  works,
  isLoading,
  loadWorks: loadCurrentWorks,
}) => {
  useEffect(() => {
    loadCurrentWorks();
  }, []);

  return (
    <section ref={introSection} className={styles.portfolio}>
      <Loader isLoading={!isLoading}>
        <Portfolio works={works} />
      </Loader>
    </section>
  );
};

PortfolioContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  works: PropTypes.instanceOf(Array).isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadWorks: PropTypes.func.isRequired,
};

export default connect(
  (state) => ({
    works: selectWorks(state),
    isLoading: selectIsLoading(state),
  }), { loadWorks },
)(PortfolioContainer);
