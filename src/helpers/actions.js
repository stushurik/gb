import { compose } from 'redux';
import { rejectOnError } from './http'

export function createAction(type, payload) {
  return { type, payload };
}

export function createAsyncFetchingAction(
  path,
  requestActionCreator,
  successActionCreator,
  errorActionCreator,
  resultAccessor = identity
) {
  return dispatch => {
    dispatch(requestActionCreator());
    return fetch(path)
      .then(rejectOnError)
      .then(response => response.json())
      .then(resultAccessor)
      .then(compose(dispatch, successActionCreator))
      .catch(compose(dispatch, errorActionCreator));
  };
}

function identity(arg) {
  return arg;
}
