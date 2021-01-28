import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectWorks, selectIsLoading } from 'redux/selectors/portfolio';
import { loadWorks } from 'redux/actions/portfolio';
import {
  Portfolio,
  Loader,
  MetaTags,
} from 'components';
import { getDocumentFields } from 'utils/helper';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const PortfolioContainer = ({
  introSection,
  works,
  isLoading,
  loadWorks: loadCurrentWorks,
}) => {
  const { portfolioOrder } = getDocumentFields(works, ['portfolioOrder']);

  useEffect(() => {
    loadCurrentWorks('portfolio');
  }, []);

  return (
    <Fragment>
      <MetaTags page={PAGES.portfolio} />
      <section ref={introSection} className={styles.portfolio}>
        <Loader isLoading={!isLoading}>
          {portfolioOrder && <Portfolio works={portfolioOrder} />}
        </Loader>
      </section>
    </Fragment>
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
