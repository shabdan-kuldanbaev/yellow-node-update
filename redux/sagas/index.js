import { all, fork } from 'redux-saga/effects';
import * as contact from './contact';
import * as subscribe from './subscribe';

export default function* rootSaga() {
  yield all([
    ...Object.values(contact),
    ...Object.values(subscribe),
  ].map(fork));
}
