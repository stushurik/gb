import React, { Component } from 'react';
import Search from './search.container';
import SearchResults from './search-results.container';
import UserDetails from './user-details.container';
import 'materialize-css/dist/css/materialize.css';

const ESC_KEY_CODE = 27;

class App extends Component {
  constructor(props) {
    super(props);

    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp)
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp)
  }

  render() {
    return (
      <div className="container" onKeyUp={this.handleKeyUp}>
        <div className="row">
          <div className="col l12 m12">
            <header className="z-depth-3">
              <h1>GitHub browser</h1>
              <Search />
            </header>
          </div>
        </div>
        <div className="row">
          <div className="col l5 m5">
            <section className="z-depth-3">
              {this.props.hasApiErrors ? (
                <div className="pink lighten-2">An error occurred while processing your request, please try again later</div>
              ) : (
                <SearchResults />
              )}
            </section>
          </div>
          <div className="col l7 m7">
            <section className="z-depth-3">
              {this.props.isUserDetailsVisible ? (
                <UserDetails />
              ) : (
                <aside>In order to check out details select a user</aside>
              )}
            </section>
          </div>
        </div>
      </div>
    );
  }

  handleKeyUp({ keyCode }) {
    if (keyCode === ESC_KEY_CODE) {
      this.props.onReset();
    }
  }
}

export default App;
