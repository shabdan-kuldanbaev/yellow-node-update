import React from 'react';

export const Arrow = ({ position }) => {
  switch (position) {
  case 'right':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="86" height="62" viewBox="0 0 86 62">
        <path
          fillRule="evenodd"
          d="M2323 11825.406L2292 11856 2261 11825.406 2266.702 11819.779 2287.968 11840.767 2287.968 11770 2296.032 11770 2296.032 11840.767 2317.298 11819.779z"
          transform="matrix(0 1 1 0 -11770 -2261)"
        />
      </svg>
    );
  case 'left':
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="86" height="62" viewBox="0 0 86 62">
        <path
          fillRule="evenodd"
          d="M139 11825.406L108 11856 77 11825.406 82.702 11819.779 103.968 11840.767 103.968 11770 112.032 11770 112.032 11840.767 133.298 11819.779z"
          transform="rotate(90 5966.5 5889.5)"
        />
      </svg>
    );
  default:
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="86" height="62" viewBox="0 0 86 62">
        <path
          fillRule="evenodd"
          d="M139 11825.406L108 11856 77 11825.406 82.702 11819.779 103.968 11840.767 103.968 11770 112.032 11770 112.032 11840.767 133.298 11819.779z"
          transform="rotate(90 5966.5 5889.5)"
        />
      </svg>
    );
  }
};
