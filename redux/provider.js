'use client';

import { reduxStore } from 'redux/store';
import { Provider } from 'react-redux';

export function ReduxProvider({ children }) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
