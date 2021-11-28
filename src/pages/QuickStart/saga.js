import { put, takeLatest, call } from 'redux-saga/effects';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { DEFAULT_ACTION } from './constants';
import { defaultActionSuccess, defaultActionFail } from './actions';
const contentful = require('contentful');

function* getContentPage() {
  try {
    const client = contentful.createClient({
      space: 'yicuw1hpxsdg',
      accessToken: 'rIeZdr6VyNARtIfAETRuivhCs4gaQNF8NWdYyTstgjo',
    });

    const response = client.getEntry('6A6V2iqkTKvkeC88DTbPDE').then(entry => {
      const myObject = {
        title: entry.fields.title,
        description: documentToHtmlString(entry.fields.description),
        sourceBook: entry.fields.sourceBook[0].fields,
      };
      return myObject;
    });
    const responseJson = yield response;
    yield put(defaultActionSuccess(responseJson));
  } catch (e) {
    yield put(defaultActionFail(e));
    // yield put(dropDownItemsError(e));
  }
}
// Individual exports for testing
export default function* quickStartSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(DEFAULT_ACTION, getContentPage);
}
