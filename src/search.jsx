import React from 'react';

export default ({query, onQuerySubmit}) => (
  <React.Fragment>
  <label>Search</label>
  <input
    type='text'
    placeholder='Enter github user name'
    value={query || ''}
    onChange={({ target: { value } }) => onQuerySubmit(value)}
  />
</React.Fragment>
)
