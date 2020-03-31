import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Header,
  AddFooter,
  Partners,
  Duck,
} from 'components';

const Intro = ({ theme }) => {
  const [scrollLabel, setScroll] = useState({});
  const [isModelLoaded, setLoaded] = useState(true);
  const section = useRef(null);

  return (
    <section ref={section}>
      {/* <Duck handleOnLoaded={setLoaded} /> */}
      <Header
        theme={theme}
        scrollLabel={scrollLabel}
        isModelLoaded={isModelLoaded}
        section={section}
      />
      <AddFooter
        theme={theme}
        setScroll={setScroll}
        isModelLoaded={isModelLoaded}
      />
      <Partners />
    </section>
  );
};

Intro.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Intro;
