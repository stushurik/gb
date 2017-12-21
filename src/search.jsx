import React, { Component } from 'react'
import './search.css';

class Search extends Component {

  constructor(props) {
    super(props);

    this.state = {
      query: this.props.query || ''
    };

    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this)
  }

  render() {
    return (
      <div className="search-box">
        <div className="search-box__field">
          <label className="search-box__label">
            Search
          </label>
          <input className="search-box__input" type="text" placeholder="Enter github user name" value={this.state.query} onChange={this.handleQueryChange}/>
        </div>
        <button className="search-box__trigger" onClick={this.handleQuerySubmit}>SEARCH</button>
      </div>
    )
  }

  handleQueryChange({target: {value}}) {
    this.setState({
      query: value
    })
  }

  handleQuerySubmit() {
    this.props.onQuerySubmit(this.state.query)
  }

}

export default Search