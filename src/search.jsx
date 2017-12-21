import React, { Component } from 'react'

class Search extends Component {

  constructor(props) {
    super(props);

    this.handleQueryChange = this.handleQueryChange.bind(this);
  }

  render() {
    return (
      <React.Fragment>
        <label>
          Search
        </label>
        <input
          type="text"
          placeholder="Enter github user name"
          value={this.props.query || ''}
          onChange={this.handleQueryChange}
        />
      </React.Fragment>
    )
  }

  handleQueryChange({target: {value}}) {
    this.props.onQuerySubmit(value)
  }

}

export default Search