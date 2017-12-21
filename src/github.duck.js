import { compose, combineReducers } from 'redux';
import { createAction } from './actions'

const GITHUB_API_URL = 'https://api.github.com';

export const SEARCH_USERS_REQUEST = 'SEARCH_USERS_REQUEST';
export const SEARCH_USERS_SUCCESS = 'SEARCH_USERS_SUCCESS';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_REPOS_REQUEST = 'GET_REPOS_REQUEST';
export const GET_REPOS_SUCCESS = 'GET_REPOS_SUCCESS';
export const GET_ISSUES_REQUEST = 'GET_ISSUES_REQUEST';
export const GET_ISSUES_SUCCESS = 'GET_ISSUES_SUCCESS';
export const RESET_USERS = 'RESET_USERS';


export default combineReducers({
  users: usersReducer,
  repos: reposReducer,
  issues: issuesReducer
});

function usersReducer(
  state = {
    searching: false,
    query: null,
    fetching: false,
    fetchingFor: null,
    results: {}
  },
  { type, payload }
) {
  switch (type) {
    case SEARCH_USERS_REQUEST:
      return { ...state, searching: true, query: payload.query };

    case GET_USER_REQUEST:
      return { ...state, fetching: true, fetchingFor: payload.login };

    case SEARCH_USERS_SUCCESS:
      return {
        ...state,
        searching: false,
        results: groupBy(payload.users, u => u.login)
      };

    case GET_USER_SUCCESS:
      const clonedResults = { ...state.results, [payload.login]: payload.user };
      return { ...state, fetching: false, results: clonedResults };

    case RESET_USERS:
      return {
        searching: false,
        query: null,
        fetching: false,
        fetchingFor: null,
        results: {}
      };
    default:
      return state;
  }
}

function reposReducer(
  state = {
    fetching: false,
    login: null,
    results: {}
  },
  { type, payload }
) {
  switch (type) {
    case GET_REPOS_REQUEST:
      return { ...state, fetching: true, login: payload.login };

    case GET_REPOS_SUCCESS:
      const clonedResults = {
        ...state.results,
        [state.login]: payload.repos
      };
      return { ...state, fetching: false, results: clonedResults };

    default:
      return state;
  }
}

function issuesReducer(
  state = {
    fetching: false,
    login: null,
    results: {}
  },
  { type, payload }
) {
  switch (type) {
    case GET_ISSUES_REQUEST:
      return { ...state, fetching: true, login: payload.login };
    case GET_ISSUES_SUCCESS:
      const clonedResults = {
        ...state.results,
        [payload.repoName]: payload.issues
      };
      return {
        ...state,
        fetching: false,
        results: clonedResults
      };
    default:
      return state;
  }
}

// Search api
export function searchUsers(query) {

  if (query === '') {
    return createAction(RESET_USERS);
  }

  return createAsyncFetchingAction(
    `${GITHUB_API_URL}/search/users?q=${query}`,
    requestUsers.bind(null, query),
    rememberUsers,
    result => result.items
  );
}

function requestUsers(query) {
  return createAction(SEARCH_USERS_REQUEST, { query });
}

function rememberUsers(users) {
  return createAction(SEARCH_USERS_SUCCESS, { users });
}

export function resetUsers() {
  return createAction(RESET_USERS);
}

// User details api
export function getUser(login) {
  return createAsyncFetchingAction(
    `${GITHUB_API_URL}/users/${login}`,
    requestUserDetails.bind(null, login),
    saveUserDetails.bind(null, login)
  );
}

function requestUserDetails(login) {
  return createAction(GET_USER_REQUEST, { login });
}

function saveUserDetails(login, user) {
  return createAction(GET_USER_SUCCESS, { login, user });
}

// Repos api
export function getRepos(login) {
  return createAsyncFetchingAction(
    `${GITHUB_API_URL}/users/${login}/repos`,
    requestReposForUser.bind(null, login),
    rememberRepos.bind(null, login)
  );
}

function requestReposForUser(login) {
  return createAction(GET_REPOS_REQUEST, { login });
}

function rememberRepos(login, repos) {
  const getRepoIssuesForUser = getIssues.bind(null, login);

  return dispatch => {
    dispatch(createAction(GET_REPOS_SUCCESS, { login, repos }));

    // bad way to retrieve repo issues (multiple requests), but with only 4 available api endpoints seems ok
    repos.map(r => r.name).forEach(compose(dispatch, getRepoIssuesForUser));
  };
}

// Issues api
export function getIssues(login, repoName) {
  return createAsyncFetchingAction(
    `${GITHUB_API_URL}/repos/${login}/${repoName}/issues`,
    requestIssues.bind(null, login, repoName),
    rememberIssues.bind(null, repoName)
  );
}

function requestIssues(login, repoName) {
  return createAction(GET_ISSUES_REQUEST, { login, repoName });
}

function rememberIssues(repoName, issues) {
  return createAction(GET_ISSUES_SUCCESS, { repoName, issues });
}

// Utils
function createAsyncFetchingAction(
  path,
  requestActionCreator,
  successActionCreator,
  resultAccessor = identity
) {
  return dispatch => {
    dispatch(requestActionCreator());
    return fetch(path)
      .then(response => response.json())
      .then(resultAccessor)
      .then(compose(dispatch, successActionCreator));
  };
}

function identity(arg) {
  return arg;
}

function groupBy(items, predicate) {
  return items.reduce((acc, elem) => {
    acc[predicate(elem)] = elem;
    return acc;
  }, {});
}
