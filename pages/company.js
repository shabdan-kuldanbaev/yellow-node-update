import React from 'react';
import { JSONAnimation } from 'components/Common/Animated/JSONAnimation';

const Container = ({ children }) => (
  <section style={{
    backgroundColor: 'white',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }}
  >
    {children}
  </section>
);

const Company = () => (
  <Container>
    <JSONAnimation />
  </Container>
);

export default Company;
