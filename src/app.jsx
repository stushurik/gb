import React, { Component } from 'react';
import Search from './search.container';
import SearchResults from './search-results.container';
import UserDetails from './user-details.container'
import './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <h1>GitHub browser</h1>
          <Search/>
        </header>
        <section className="search-results-container">
          <SearchResults/>
          {
            this.props.showUserDetails
              ? <UserDetails/>
              : null
          }
        </section>
      </div>
    );
  }
}

export default App;
