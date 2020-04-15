import { all, fork } from 'redux-saga/effects';
import * as blog from './blog';

export default function* rootSaga() {
  yield all([
    ...Object.values(blog),
  ].map(fork));
}
