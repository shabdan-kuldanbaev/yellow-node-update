import React from 'react';
import PropTypes from 'prop-types';
import {
  AddFooter,
  Partners,
  Duck,
} from 'components';
import { selectIsModelLoaded } from 'redux/selectors/home';
import { selectIsMobileMenuOpened } from 'redux/selectors/layout';
import { setModelLoading, setScrollOfAddedFooter } from 'redux/actions/home';
import { useDispatch, useSelector } from 'react-redux';

export const Intro = ({ theme, introSection }) => {
  const dispatch = useDispatch();
  const setLoaded = (value) => dispatch(setModelLoading(value));
  const setScroll = (value) => dispatch(setScrollOfAddedFooter(value));
  const isModelLoaded = useSelector((state) => selectIsModelLoaded(state));
  const isMobileMenuOpened = useSelector((state) => selectIsMobileMenuOpened(state));

  return (
    <section ref={introSection}>
      <Duck handleOnLoaded={setLoaded} />
      <AddFooter
        theme={theme}
        isModelLoaded={isModelLoaded}
        setScroll={setScroll}
        isMobileMenuOpened={isMobileMenuOpened}
      />
      <Partners />
    </section>
  );
};

Intro.defaultProps = {
  theme: 'dark',
};

Intro.propTypes = {
  theme: PropTypes.string,
  introSection: PropTypes.instanceOf(Object).isRequired,
};
