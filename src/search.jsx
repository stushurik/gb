import React, { Component } from 'react'

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
      <React.Fragment>
        <label>
          Search
        </label>
        <input type="text" placeholder="Enter github user name" value={this.state.query} onChange={this.handleQueryChange}/>
        <button onClick={this.handleQuerySubmit}>SEARCH</button>
      </React.Fragment>
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