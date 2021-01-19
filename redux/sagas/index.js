import { all, fork } from 'redux-saga/effects';
import * as blog from './blog';
import * as portfolio from './portfolio';
import * as contact from './contact';
import * as subscribe from './subscribe';
import * as process from './process';
import * as home from './home';
import * as company from './company';

export default function* rootSaga() {
  yield all([
    ...Object.values(blog),
    ...Object.values(portfolio),
    ...Object.values(contact),
    ...Object.values(subscribe),
    ...Object.values(process),
    ...Object.values(home),
    ...Object.values(company),
  ].map(fork));
}
