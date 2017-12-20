import {
  searchUsers, SEARCH_USERS_REQUEST, SEARCH_USERS_SUCCESS,
  getUser, GET_USER_REQUEST, GET_USER_SUCCESS,
  getRepos, GET_REPOS_REQUEST, GET_REPOS_SUCCESS,
  getIssues, GET_ISSUES_REQUEST, GET_ISSUES_SUCCESS,
  default as reducer
} from './github.duck';

describe('github duck', () => {

  let sut;
  let dispatch;

  beforeEach(() => {
    dispatch = jest.fn()
  });

  describe('action creators', () => {

    let fetchSpy;
    let response;
    let json;

    beforeAll(() => {
      fetchSpy = jest.spyOn(global, 'fetch')
    });

    afterAll(() => {
      fetchSpy.mockRestore()
    });

    afterEach(() => {
      fetchSpy.mockClear()
    });

    describe('search users', () => {

      let query;

      beforeEach(async (done) => {

        json = {
          items: Symbol('items')
        };

        response = fakeResponse(null, json);
        fetchSpy.mockImplementation(() => response);

        query = String(Math.random());
        sut = searchUsers(query);
        await sut(dispatch);
        done()
      });

      it('should inform that users search in progress', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: SEARCH_USERS_REQUEST,
          payload: {
            query
          }
        })
      });

      it('should search users by query using github api', () => {
        expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/search/users?q=${query}`)
      });

      it('should remember received users on success', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: SEARCH_USERS_SUCCESS,
          payload: {
            users: json.items
          }
        })
      })

    });

    describe('get user', () => {

      let login;

      beforeEach(async (done) => {

        json = Symbol('user');

        response = fakeResponse(null, json);
        fetchSpy.mockImplementation(() => response);

        login = String(Math.random());
        sut = getUser(login);
        await sut(dispatch);
        done()
      });

      it('should inform that user details retrieving in progress', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_USER_REQUEST,
          payload: {
            login
          }
        })
      });

      it('should get user details by login using github api', () => {
        expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/users/${login}`)
      });

      it('should save user details on success', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_USER_SUCCESS,
          payload: {
            login,
            user: json
          }
        })
      });

    });

    describe('get repos', () => {

      let login;

      beforeEach(async (done) => {

        json = Symbol('repos');

        response = fakeResponse(null, json);
        fetchSpy.mockImplementation(() => response);

        login = String(Math.random());

        sut = getRepos(login);
        await sut(dispatch);
        done()
      });

      it('should inform that repos retrieving in progress', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_REPOS_REQUEST,
          payload: {
            login
          }
        })
      });

      it('should get repos by login and repousing github api', () => {
        expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/users/${login}/repos`)
      });

      it('should remember repos on success', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_REPOS_SUCCESS,
          payload: {
            login,
            repos: json
          }
        })
      });

    });

    describe('get issues', () => {

      let login;
      let repoName;

      beforeEach(async (done) => {

        json = Symbol('issues');

        response = fakeResponse(null, json);
        fetchSpy.mockImplementation(() => response);

        login = String(Math.random());
        repoName = String(Math.random());

        sut = getIssues(login, repoName);
        await sut(dispatch);
        done()
      });

      it('should inform that repos retrieving in progress', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_ISSUES_REQUEST,
          payload: {
            login,
            repoName
          }
        })
      });

      it('should get repos by login and repousing github api', () => {
        expect(fetchSpy).toHaveBeenCalledWith(`https://api.github.com/repos/${login}/${repoName}/issues`)
      });

      it('should remember repos on success', () => {
        expect(dispatch).toHaveBeenCalledWith({
          type: GET_ISSUES_SUCCESS,
          payload: {
            issues: json
          }
        })
      });

    });

  });

  describe('reducer', () => {

    let state;

    describe('search users', () => {

      it('should mark as searching users on search request', () => {
        const query = String(Math.random());

        state = reducer({}, {type: SEARCH_USERS_REQUEST, payload: {query}});
        expect(state.users.searching).toEqual(true);
        expect(state.users.query).toEqual(query)
      });

      it('should remember found users when users are received', () => {
        const users = [
          {login: String(Math.random())},
          {login: String(Math.random())},
          {login: String(Math.random())}
        ];

        state = reducer({}, {type: SEARCH_USERS_SUCCESS, payload: {users}});
        expect(state.users.searching).toEqual(false);
        expect(state.users.results).toMatchObject(
          users.reduce((retVal, user) => {
            retVal[user.login] = user;
            return retVal
          }, {})
        )
      });

      it('should mark as fetching on retrieve request', () => {
        const login = String(Math.random());
        state = reducer({}, {type: GET_USER_REQUEST, payload: {login}});
        expect(state.users.fetching).toEqual(true);
        expect(state.users.fetchingFor).toEqual(login)
      });

      it('should update user on received user', () => {
        const login = String(Math.random());
        const oldState = {
          users: {
            results: {
              [login]: {}
            }
          }
        };
        const user = {
          id: String(Math.random()),
          login
        };
        state = reducer(oldState, {type: GET_USER_SUCCESS, payload: {login, user}});
        expect(state.users.results[login]).toBe(user)
      })

    });

    describe('get repos', () => {

      it('should mark as fetching repos on request', () => {
        const login = String(Math.random());

        state = reducer({}, {type: GET_REPOS_REQUEST, payload: {login}});
        expect(state.repos.fetching).toEqual(true);
        expect(state.repos.login).toEqual(login)
      });

      it('should remember found users when users are received', () => {
        const login = String(Math.random());
        const repos = [
          {owner: {login: String(Math.random())}},
          {owner: {login: String(Math.random())}},
          {owner: {login: String(Math.random())}}
        ];

        state = reducer({}, {type: GET_REPOS_SUCCESS, payload: {login, repos}});
        expect(state.repos.fetching).toEqual(false);
        expect(state.repos.results).toMatchObject(
          repos.reduce((retVal, repo) => {
            retVal[repo.owner.login] = repo;
            return retVal
          }, {})
        )
      })
    })

  })

});

function fakeResponse(error, json) {

  if (error) {
    return Promise.reject(error)
  }

  return Promise.resolve({
    json: jest.fn(() => Promise.resolve(json))
  })
}