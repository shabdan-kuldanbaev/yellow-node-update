import React, { useRef, useEffect } from 'react';
import { animated, useSpring } from 'react-spring/web.cjs';
// TODO import { animated, useSpring } from 'react-spring/web.cjs';

export const Parallax = ({ children }) => {
  const ref = useRef();
  const [{ offset }, set] = useSpring(() => ({ offset: 0 }));

  const calc = o => `translateY(${o * 0.1}px)`;

  const handleScroll = () => {
    const posY = ref.current.getBoundingClientRect().top;
    const offset = window.pageYOffset - posY;
    set({ offset });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <div
      style={{
        marginTop: '300px',
        background: '#123456',
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}
      ref={ref}
    >
      <animated.div
        style={{
          background: 'red',
          marginTop: '30vh',
          transform: offset.interpolate(calc),
        }}
      >
        {children}
      </animated.div>
    </div>
  );
};
