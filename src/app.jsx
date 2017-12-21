import React, { Component } from 'react';
import Search from './search.container';
import SearchResults from './search-results.container';
import UserDetails from './user-details.container';
import 'materialize-css/dist/css/materialize.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col l12 m12">
            <header className="z-depth-3">
              <h1>GitHub browser</h1>
              <Search/>
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col l5 m5">
            <section className="z-depth-3">
              <SearchResults/>
            </section>
          </div>
          <div className="col l7 m7">
            <section className="z-depth-3">
              {
                this.props.isUserDetailsVisible
                  ? <UserDetails/>
                  : <aside>In order to check out details select a user</aside>
              }
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
