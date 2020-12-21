import { all, fork } from 'redux-saga/effects';
import * as blog from './blog';
import * as portfolio from './portfolio';
import * as contact from './contact';
import * as subscribe from './subscribe';
import * as process from './process';

export default function* rootSaga() {
  yield all([
    ...Object.values(blog),
    ...Object.values(portfolio),
    ...Object.values(contact),
    ...Object.values(subscribe),
    ...Object.values(process),
  ].map(fork));
}
