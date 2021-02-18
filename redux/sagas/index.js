import { all, fork } from 'redux-saga/effects';
import * as contact from './contact';
import * as subscribe from './subscribe';
import * as layout from './layout';

export default function* rootSaga() {
  yield all([
    ...Object.values(contact),
    ...Object.values(subscribe),
    ...Object.values(layout),
  ].map(fork));
}
