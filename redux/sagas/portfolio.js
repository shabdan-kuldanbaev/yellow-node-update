import { put } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { contentfulClient } from 'utils/ContentfulClient';

ObjectAssign.polyfill();
es6promise.polyfill();

export function* getProject({ projectSlug }) {
  try {
    const project = yield contentfulClient.getEntries({
      contentType: 'project',
      additionalQueryParams: {
        'fields.slug[match]': projectSlug,
      },
    });

    yield put({ type: actionTypes.GET_PROJECT_SUCCESS, payload: project });
  } catch (err) {
    yield put({ type: actionTypes.GET_PROJECT_FAILED, payload: err });
  }
}
