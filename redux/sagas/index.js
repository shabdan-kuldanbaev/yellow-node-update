import { all, fork } from 'redux-saga/effects';
import * as blog from './blog';
import * as portfolio from './portfolio';

export default function* rootSaga() {
  yield all([
    ...Object.values(blog),
    ...Object.values(portfolio),
  ].map(fork));
}
