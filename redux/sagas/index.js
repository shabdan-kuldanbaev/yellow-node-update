import { all, fork } from 'redux-saga/effects';
import * as blog from './blog';
import * as contact from './contact';
import * as subscribe from './subscribe';
import * as process from './process';
import * as layout from './layout';

export default function* rootSaga() {
  yield all([
    ...Object.values(blog),
    ...Object.values(contact),
    ...Object.values(subscribe),
    ...Object.values(process),
    ...Object.values(layout),
  ].map(fork));
}
