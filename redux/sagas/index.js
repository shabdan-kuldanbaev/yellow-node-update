import { all, fork } from 'redux-saga/effects';
import * as contact from './contact';

export default function* rootSaga() {
  yield all([
    ...Object.values(contact),
  ].map(fork));
}
