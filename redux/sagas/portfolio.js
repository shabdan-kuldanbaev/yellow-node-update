import get from 'lodash/get';
import { put } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { actionTypes } from 'redux/actions/actionTypes';
import { contentfulClient } from 'utils/contentful/client';
import { CASE_STUDIES_SLUGS } from 'utils/constants';
import { GRAPHQL_QUERY } from '../../utils/contentful/graphqlQuery';

ObjectAssign.polyfill();
es6promise.polyfill();

function getGraphqlResultTags(graphqlResult) {
  return get(graphqlResult, 'workTagCollection.items', []);
}

export function* fetchProject({ projectSlug }) {
  try {
    // TODO: remove this when caseStudy will be done
    const contentType = CASE_STUDIES_SLUGS.includes(projectSlug) ? 'page' : 'project';

    const project = yield contentfulClient.getEntries({
      contentType,
      additionalQueryParams: {
        'fields.slug[match]': projectSlug,
      },
    });

    yield put({ type: actionTypes.GET_PROJECT_SUCCESS, payload: project });
  } catch (error) {
    yield put({ type: actionTypes.GET_PROJECT_FAILED, payload: error });
  }
}

export function* fetchTags() {
  try {
    const response = yield contentfulClient.graphql(GRAPHQL_QUERY.loadPortfolioTags({ order: '[displayName_ASC]' }));

    // console.log(response);
    yield put({
      type: actionTypes.GET_PORTFOLIO_TAGS_SUCCESS,
      payload: getGraphqlResultTags(response),
    });
  } catch (e) {
    yield put({ type: actionTypes.GET_PORTFOLIO_TAGS_FAILED, payload: e });
  }
}
