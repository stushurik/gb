import React from 'react';
import renderer from 'react-test-renderer';

import SearchResults from './search-results';

describe('search results', () => {

  let props;

  beforeEach(() => {
    props = {
      users: []
    }
  });

  it('should show that no results were found', () => {
    const tree = renderer
      .create(<SearchResults {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should show users if they were found', () => {
    props.users = [
      {id:'1', login: 'John Doe', avatar_url: 'http://example.com/fancy_kitten.png'},
      {id:'2', login: 'Darth Weider', avatar_url: 'http://example.com/death_start.png'},
      {id:'3', login: 'Bill Gates', avatar_url: 'http://example.com/windows.png'},
    ];
    const tree = renderer
      .create(<SearchResults {...props}/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  })

});
