import { all, fork } from 'redux-saga/effects';
import * as blog from './blog';
import * as portfolio from './portfolio';
import * as contact from './contact';

export default function* rootSaga() {
  yield all([
    ...Object.values(blog),
    ...Object.values(portfolio),
    ...Object.values(contact),
  ].map(fork));
}
