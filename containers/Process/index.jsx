import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProcessPage } from 'redux/selectors/process';
import { getJSON } from 'redux/actions/process';
import {
  Process,
  Loader,
  // TODO SectionTitle,
  MetaTags,
  LoadingPage,
} from 'components';
import { PAGES } from 'utils/constants';
import styles from './styles.module.scss';

const ProcessContainer = ({
  introSection,
  getJSON: getProcessJSON,
  processes: { json, isLoading },
}) => {
  const [isAnimationEnded, setIsAnimationEnded] = useState(false);

  const handleOnAnimationComplete = () => setIsAnimationEnded(true);

  useEffect(() => {
    if (!json.length) {
      getProcessJSON();
    }
  }, [json]);

  return (
    <Fragment>
      <MetaTags page={PAGES.process} />
      {
        !isAnimationEnded ? (
          <LoadingPage
            isLoading={isLoading}
            handleOnAnimationComplete={handleOnAnimationComplete}
          />
        ) : (
          <section ref={introSection} className={styles.process}>
            {/* TODO <div className={styles.intro}>
      <SectionTitle title="How we work" subtitle="A step by step guide" />
    </div> */}
            <Process processes={json} />
          </section>
        )
      }
    </Fragment>
  );
};

ProcessContainer.propTypes = {
  introSection: PropTypes.instanceOf(Object).isRequired,
  getJSON: PropTypes.func.isRequired,
  processes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  (state) => ({ processes: selectProcessPage(state) }),
  { getJSON },
)(ProcessContainer);
