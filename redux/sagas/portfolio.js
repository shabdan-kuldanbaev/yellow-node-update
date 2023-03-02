import { put } from 'redux-saga/effects';
import es6promise from 'es6-promise';
import ObjectAssign from 'es6-object-assign';
import { contentfulClient } from 'utils/contentful/client';
import { GRAPHQL_QUERY } from 'utils/contentful/graphqlQuery';
import { getGraphqlResultTags, getGraphqlResultWorkTypes } from 'utils/contentful/helper';
import { errorOccured, tagsLoaded, typesLoaded } from 'redux/reducers/portfolio';

ObjectAssign.polyfill();
es6promise.polyfill();

export function* fetchTags() {
  try {
    const response = yield contentfulClient.graphql(GRAPHQL_QUERY.loadTag({
      where: { type: 'work' },
      order: '[title_ASC]',
    }));

    yield put(tagsLoaded(getGraphqlResultTags(response)));
  } catch (error) {
    yield put(errorOccured(error));
  }
}

export function* fetchTypes() {
  try {
    const response = yield contentfulClient.graphql(GRAPHQL_QUERY.loadPortfolioTypes({ order: '[entryName_ASC]' }));

    yield put(typesLoaded(getGraphqlResultWorkTypes(response)));
  } catch (error) {
    yield put(errorOccured(error));
  }
}
