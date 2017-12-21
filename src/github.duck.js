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
  {type, payload}
) {
  switch (type) {
    case SEARCH_USERS_REQUEST:
      return {...state, searching: true, query: payload.query};
    case GET_USER_REQUEST:
      return {...state, fetching: true, fetchingFor: payload.login};
    case SEARCH_USERS_SUCCESS:
      const results = payload.users.reduce((res, user) => {
        res[user.login] = user;
        return res
      }, {});
      return {...state, searching: false, results};
    case GET_USER_SUCCESS:
      const clonedResults = { ...state.results, [payload.login]: payload.user};
      return {...state, fetching: false, results: clonedResults};
    case RESET_USERS:
      return {
        searching: false,
        query: null,
        fetching: false,
        fetchingFor: null,
        results: {}
      };
    default:
      return state
  }
}

function reposReducer(
  state = {
    fetching: false,
    login: null,
    results: {}
  },
  {type, payload}
) {
  switch (type) {
    case GET_REPOS_REQUEST:
      return {...state, fetching: true, login: payload.login};
    case GET_REPOS_SUCCESS:

      const clonedResults = {
        ...state.results,
        [state.login]: payload.repos
      };
      return {...state, fetching: false, results: clonedResults};
    default:
      return state
  }
}


function issuesReducer(
  state = {
    fetching: false,
    login: null,
    repoName: null,
    results: []
  },
  {type, payload}
) {
  switch (type) {
    case GET_ISSUES_REQUEST:
      return {...state, fetching: true, login: payload.login, repoName: payload.repoName};
    case GET_ISSUES_SUCCESS:
      return {...state, fetching: false, issues: payload.issues};
    default:
      return state
  }
}


// Search api
export function searchUsers(query) {
  return createAsyncAction(
    `${GITHUB_API_URL}/search/users?q=${query}`,
    requestUsers.bind(null, query),
    rememberUsers,
    result => result.items
  )
}

function requestUsers(query) {
  return createAction(SEARCH_USERS_REQUEST, {query})
}

function rememberUsers(users) {
  return createAction(SEARCH_USERS_SUCCESS, {users})
}

export function resetUsers() {
  return createAction(RESET_USERS)
}

// User details api
export function getUser(login) {
  return createAsyncAction(
    `${GITHUB_API_URL}/users/${login}`,
    requestUserDetails.bind(null, login),
    saveUserDetails.bind(null, login)
  )
}

function requestUserDetails(login) {
  return createAction(GET_USER_REQUEST, {login})
}

function saveUserDetails(login, user) {
  return createAction(GET_USER_SUCCESS, {login, user})
}


// Repos api
export function getRepos(login) {
  return createAsyncAction(
    `${GITHUB_API_URL}/users/${login}/repos`,
    requestReposForUser.bind(null, login),
    rememberRepos.bind(null, login)
  )
}

function requestReposForUser(login) {
  return createAction(GET_REPOS_REQUEST, {login})
}

function rememberRepos(login, repos) {
  return createAction(GET_REPOS_SUCCESS, {login, repos})
}


// Issues api
export function getIssues(login, repoName) {
  return createAsyncAction(
    `${GITHUB_API_URL}/repos/${login}/${repoName}/issues`,
    requestIssues.bind(null, login, repoName),
    rememberIssues
  )
}

function requestIssues(login, repoName) {
  return createAction(GET_ISSUES_REQUEST, {login, repoName})
}

function rememberIssues(issues) {
  return createAction(GET_ISSUES_SUCCESS, {issues})
}


// Utils
function createAsyncAction(path, requestActionCreator, successActionCreator, resultAccessor = identity) {
  return dispatch => {
    dispatch(requestActionCreator());
    return fetch(path)
      .then(response => response.json())
      .then(resultAccessor)
      .then(compose(dispatch, successActionCreator))
  }
}

function identity(arg) {
  return arg
}
